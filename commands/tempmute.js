const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  //!tempmute @user 1s/m/h/d


  if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Sorry je kunt dit niet doen!");

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!user) return message.channel.send("Geef een gebruiker op of de gebruiker is niet op deze server!");

    if (user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry u kunt deze gebruiker niet muten!");

    var muteRole = message.guild.roles.find("name", "muted");

    if (!muteRole) return message.channel.send("De rol muted bestaat niet!");

    var muteTime = args[1];
    
    if (!muteTime) return message.channel.send("Geef een tijd mee.")

    await (user.addRole(muteRole.id));

    message.channel.send(`${user} is gemuted voor ${muteTime}`);

    setTimeout(function () {

        user.removeRole(muteRole.id);

        message.channel.send(`${user} is geunmuted`);

    }, ms(muteTime));

}


module.exports.help = {
  name: "mute"
}