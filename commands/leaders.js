const Discord = require("discord.js");
const mongoose = require('mongoose');


const Level = require("./level.js");
module.exports.run = async (bot, message, args) => {
    await message.delete();
    if (message.author.id !== '178657593030475776') return;
    //Grab all of the users in said server
    Level.find({
        serverID: message.guild.id
    }).sort([
        ['Level', 'descending']
    ]).exec((err, res) => {
        if (err) console.log(err);

        let embed = new Discord.RichEmbed()
            .setTitle("Level Leaderboard")
        //if there are no results
        if (res.length === 0) {
            embed.setColor("RED");
            embed.addField("Geen gegevens gevonden", "Typ in de chat om xp te verdienen!")
        } else if (res.length < 10) {
            //less than 10 results
            embed.setColor("BLURPLE");
            for (i = 0; i < res.length; i++) {
                let member = message.guild.members.get(res[i].userID) || "Gebruiker is weg gegaan."
                if (member === "Gebruiker is weg gegaan.") {
                    embed.addField(`${i + 1}. ${member}`, `**Levels**: ${res[i].coins}`);
                } else {
                    embed.addField(`${i + 1}. ${member.user.username}`, `**Levels**: ${res[i].coins}`);
                }
            }
        } else {
            //more than 10 results
            embed.setColor("BLURPLE");
            for (i = 0; i < 10; i++) {
                let member = message.guild.members.get(res[i].userID) || "Gebruiker is weg gegaan."
                if (member === "Gebruiker is weg gegaan.") {
                    embed.addField(`${i + 1}. ${member}`, `**Levels**: ${res[i].coins}`);
                } else {
                    embed.addField(`${i + 1}. ${member.user.username}`, `**Levels**: ${res[i].coins}`);
                }
            }
        }

        message.channel.send(embed);
    })
}
module.exports.help = {
    name: "leaders"
}