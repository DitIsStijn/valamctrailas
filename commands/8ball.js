const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if(!args[2]) return message.reply("Graag een hele vraag stellen!");
    let replies = ["Ja", "Nee", "geen idee", "Vraag later"];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(1).join(" ");

    let ballembed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor("#ff9900")
    .addFlied("Vraag", question)
    .addField("Antwoord", replies[result]);

    message.channel.send(ballembed);

    }
exports.help = { 
    name: '8ball' 
  };