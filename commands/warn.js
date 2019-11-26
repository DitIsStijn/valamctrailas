const Discord = require("discord.js");
const fs = require("fs");

const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry u kunt dit niet doen");

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!user) return message.channel.send("Geef een gebruiker op of de gebruiker is niet op deze server!");

    if (user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry u kunt deze persoon niet waarschuwen.");

    var reason = args.join(" ").slice(22);

    if (!reason) return message.channel.send("Geef een redenen op.");

    if (!warns[user.id]) warns[user.id] = {
        warns: 0
    };

    warns[user.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {

        if (err) console.log(err);
    });

    let warnEmbed = new Discord.RichEmbed()
    .setDescription("~warn~")
    .setColor("#ff0066")
    .addField("Warned gebruiker", `${user}`)
    .addField("Gewarned door", `@${message.author}`)
    .addField("Gewarned In", message.channel)
    .addField("Reden", reason);

    var warnChannel = message.guild.channels.find(`name`, "incidents");
    if (!warnChannel) return message.guild.send("Kan het kanaal niet vinden");

    warnChannel.send(warnEmbed);

    }

module.exports.help = {
            name: "warn"
}