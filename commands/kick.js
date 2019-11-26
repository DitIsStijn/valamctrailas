const Discord = require("discord.js");

module.exports.run = async(bot, Message, args) => {

 
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0]));
    if(!kUser) return message.channel.send("Kan de gebruiker niet vinden!");
    let kReason = arguments.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Dit kunt u niet!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Deze persoon kan niet worden gekickd!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Kicked gebruiker", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked door", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Reden", kReason);

    let kickChannel = message.guild.channels.find(`name`, "kick");

    if(!kickChannel) return message.channel.send("Kan de kanaal niet vinden.");

    message.guild.member(kUser).kick(kReason);

    kickChannel.send(kickEmbed);

    return;
    
  }

module.exports.help = {
        name: "hallo"
}