const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args) => {

    await message.delete().catch(O_o=>{});

    const a = message.guild.roles.remove('445139379606913044'); // bezoeker
    const b = message.guild.roles.remove('582202772037042207'); // OfficialBezoeker
    const c = message.guild.roles.remove('534308124270657547'); // Friend

    const filter = (reaction, user) => ['🇦', '🇧', '🇨'].includes(reaction.emoji.name) && user.id === message.author.id;

    const embed = new RichEmbed()
        .setTitle('Kies hier welke rol je wilt removen!')
        .setDescription(`
        
        🇦 ${a.toString()}
        🇧 ${b.toString()}
        🇨 ${c.toString()}
        `)
        .setColor(0xdd9323)
        .setFooter(`ID: ${message.author.id}`);
        
    message.channel.send(embed).then(async msg => {

        await msg.react('🇦');
        await msg.react('🇧');
        await msg.react('🇨');

        msg.awaitReactions(filter, {
            max: 1,
            time: 30000,
            errors: ['time']
        }).then(collected => {

            const reaction = collected.first();

            switch (reaction.emoji.name) {
                case '🇦':
                    if (message.member.roles.has(a.id)) {
                        msg.delete(2000);
                        return message.channel.send('Je bent al in deze rol!').then(m => m.delete(3000));
                    }
                    message.member.removeRole(a).catch(err => {
                        console.log(err);
                        return message.channel.send(`Fout bij het toevoegen van u aan deze rol: **${err.message}**.`);
                    });
                    message.channel.send(`U bent toegevoegd aan de **${a.name}** role!`).then(m => m.delete(3000));
                    msg.delete();
                    break;
                case '🇧':
                    if (message.member.roles.has(b.id)) {
                        msg.delete(2000);
                        return message.channel.send('Je bent al in deze rol!').then(m => m.delete(3000));
                    }
                    message.member.removeRole(b).catch(err => {
                        console.log(err);
                        return message.channel.send(`Fout bij het toevoegen van u aan deze role: **${err.message}**.`);
                    });
                    message.channel.send(`U bent toegevoegd aan de **${b.name}** role!`).then(m => m.delete(3000));
                    msg.delete();
                    break;
                case '🇨':
                    if (message.member.roles.has(c.id)) {
                        msg.delete(2000);
                        return message.channel.send('Je zit al in deze rol!').then(m => m.delete(3000));
                    }
                    message.member.removeRole(c).catch(err => {
                        console.log(err);
                        return message.channel.send(` Fout bij het toevoegen van u aan deze rol: **${err.message}**.`);
                    });
                    message.channel.send(`U bent toegevoegd aan de **${c.name}** role!`).then(m => m.delete(3000));
                    msg.delete();
                    break;
            }
        }).catch(collected => {
            return message.channel.send(`Ik zou je niet aan deze rol kunnen toevoegen!`);
        });

        

    });

};

exports.help = {
    name: 'removerole'
};