const {RichEmbed} = require('discord.js');

exports.run = (client, message, args) => {
    
    let item = message.content.split(/\s+/g).slice(1).join(" ");  

    let steen2 = ['Papier! Ik win!', 'Schaar! Jij wint!']
    let steen1 = Math.floor(Math.random() * steen2.length);

    let papier2 = ['Rock! Ik win!', 'Schaar! Jij wint!']
    let papier1 = Math.floor(Math.random() * papier2.length);

    let schaar2 = ['Rock! Ik win', 'Papier! Jij wint!']
    let schaar1 = Math.floor(Math.random() * schaars2.length);

let rock = new RichEmbed()
    .setAuthor('Steen, Papier, Schaar')
    .setColor(0x6B5858)
    .addField('Jij kiest', `${args[0]}`)
    .addField('Ik kies', steen2[steen1])

let paper = new RichEmbed()
    .setAuthor('Steen, Papier, Schaar')
    .setColor(0x6B5858)
    .addField('jij kiest', `${args[0]}`)
    .addField('Ik kies', papier2[papier1])

let scissors = new RichEmbed()
    .setAuthor('Steen, Papier, Schaar')
    .setColor(0x6B5858)
    .addField('Jij kiest', `${args[0]}`)
    .addField('Ik kies', schaar2[schaar1])

if (item.toLowerCase().startsWith("!rps steen")) return message.channel.send(steen);
if (item.toLowerCase().startsWith("!rps papier")) return message.channel.send(papier);
if (item.toLowerCase().startsWith("!rps schaar")) return message.channel.send(schaar);

if (item.toLowerCase().startsWith("!rps")) return message.channel.send('Optie: ``Steen``, `Papier``, ``Schaar``.\n**Gebruik: -rps <option>**')

} 

exports.help = { 
  name: 'rps' 
};