const {RichEmbed} = require('discord.js');

exports.run = async (client, message, args, tools) => {

    // Role Verification (Optional)
    if (!message.member.roles.find(r => r.name === '-=-CEO-=-')) return message.channel.send('Je moet deze rol: CEO hebben om dit te doen!');

    // Permission Verification (Optional)
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Je heb deze permission: ADMINISTRATOR nodig om dit te doen!');

    if (!args[0]) return message.channel.send('Je moet het command zo gebruiken: <prefix>poll vraag');

    const embed = new RichEmbed()
        .setColor(0xffffff)
        .setFooter('Reageer om te stemmen.')
        .setDescription(args.join(' '))
        .setTitle(`Poll gemaakt door ${message.author.username}`);
    let msg = await message.channel.send({embed});

    await msg.react('✅'); 
    await msg.react('❌');

    message.delete({timeout: 3600000}); // This waits 1000 milliseconds before deleting (1 second). You can change it.

} 
exports.help = { 
    name: 'poll' 
  };