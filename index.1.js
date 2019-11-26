const botConfig = require("./botconfig.json");
const Discord = require("discord.js");
const ms = require("ms");
const levelfile = require("./data/level.json");

const fs = require("fs");


const bot = new Discord.Client();
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if (err) console.log(err);

  var jsFiles = files.filter(f => f.split(".").pop() === "js");

  if (jsFiles.length <= 0) {
    console.log("Kon geen files vinden!");
    return;

  }

  jsFiles.forEach((f, i) => {

    var fileGet = require(`./commando/${f}`);
    console.log(`De files ${f} is geladen`);

    bot.commands.set(fileGet.help.name, fileGet);
 })

});



bot.on("ready", async () => {

  console.log(`${bot.user.username} is online!`);

  bot.user.setActivity("Buiten!", { type: "PLAYING" });

})
bot.on('guildMemberAdd', member => {

  console.log('Useer' + member.user.username + 'Welkom op *OfficialCompany* Discord:tada::hugging:!')
  console.log(member)

  var role = member.guild.roles.find('name', '🏡| Minetopia Speler');

  member.addRole(role)

  member.guild.channels.get('580509410414034949').send ('**' + member.user.username + '**, Welkom op **OfficialCompany** Discord:tada::hugging:!');


});

bot.on("guildMemberRemove", member => {

  member.guild.channels.get('582196815529771010').send ('**' + member.user.username + '**, heeft **OfficialCompany** discord verlaten :pensive::cry:!');


});


bot.on("message", async message => {

  if (message.author.bot) return;

  if (message.channel.type === "dm") return;

  var prefix = botConfig.prefix;

  var messageArray = message.content.split(" ");

  var command = messageArray[0];

  var arguments = messageArray.slice(1);

  var commands = bot.commands.get(command.slice(prefix.length));

  if (commands) commands.run(bot, message, arguments);

  if (command === `${prefix}hallo`) {

    return message.channel.send("Hallo");

  }

  if (command === `${prefix}kick`) {

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0]));
    if (!kUser) return message.channel.send("Kan de gebruiker niet vinden!");
    let kReason = arguments.join(" ").slice(22);
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Dit kunt u niet!");
    if (kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Deze persoon kan niet worden gekickd!");

    let kickEmbed = new Discord.RichEmbed()
      .setDescription("~Kick~")
      .setColor("#e56b00")
      .addField("Kicked gebruiker", `${kUser} with ID ${kUser.id}`)
      .addField("Kicked door", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Kicked In", message.channel)
      .addField("Reden", kReason);

    let kickChannel = message.guild.channels.find(`name`, "incidents");

    if (!kickChannel) return message.channel.send("Kan de kanaal niet vinden.");

    message.guild.member(kUser).kick(kReason);

    kickChannel.send(kickEmbed);

    return;

  }

  if (command === `${prefix}ban`) {

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0]));
    if (!bUser) return message.channel.send("Kan de gebruiker niet vinden!");
    let bReason = arguments.join(" ").slice(22);
    if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Dit kunt u niet!");
    if (bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Deze persoon kunt u niet banen!");

    let banEmbed = new Discord.RichEmbed()
      .setDescription("~Ban~")
      .setColor("#FF2D00")
      .addField("Banned gebruiker", `${bUser} with ID ${bUser.id}`)
      .addField("Banned door", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Banned In", message.channel)
      .addField("Reason", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "incidents");
    if (!incidentchannel) return message.channel.send("Kan de kanaal niet vinden.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);

    return;

  }

  const levelfile = require("./data/level.json");

  // Genereer random xp.
  var randomxp = Math.floor(Math.random(1) * 15) + 1;

  // Verkrijg id van de gebruiker.
  var idUser = message.author.id;

  // console.log(randomxp);

  // Als persoon nog niet in file is maak dan standaard aan.
  if (!levelfile[idUser]) {

    levelfile[idUser] = {

      xp: 0,
      level: 0

    };

  }

  // Voeg xp toe.
  levelfile[idUser].xp += randomxp;

  // Verkrijg level van de gebruiker.
  var levelUser = levelfile[idUser].level;
  // Verkrijg xp van de gebruiker.
  var xpUser = levelfile[idUser].xp;
  // Bereken volgend level op basis van de xp.
  var nextLevelXp = levelUser * 300;

  // Als het level 0 is zet dan xp op 100.
  if (nextLevelXp === 0) nextLevelXp = 100;

  console.log(nextLevelXp + " " + xpUser);

  // Als gebruikeer volgend level heeft bereikt zet level 1 hoger en zet in file.
  // Let op Nodemon restart wegens dat we de file als require hebben binnengehaald.
  if (xpUser >= nextLevelXp) {

    levelfile[idUser].level += 1;

    // Wegschrijven van data. Je kan dit ook altijd opslaan maar dit zorgt ervoor dat het data
    // verkeer te groot wordt.
    fs.writeFile("./data/level.json", JSON.stringify(levelfile), err => {

      if (err) console.log(err);

    });

    // Zenden van een embed met gegevens.
    var embedLevel = new discord.RichEmbed()
      .setDescription("***Level hoger***")
      .setColor("#29e53f")
      .addField("Nieuw level: ", levelfile[idUser].level);

    message.channel.send(embedLevel);

  }



}

);

bot.login(botConfig.token);