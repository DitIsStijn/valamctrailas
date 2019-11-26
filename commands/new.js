const discord = require('discord.js'); //haal discord.js binnen

exports.run = (client, message, args, guild) => { //dingen definen

    //Onderwerp van de ticket
    let onderwerp = args.join(" ");

    //Username van de persoon
    var userName = message.author.username;

    //Icon  van de bot
    let bicon = client.user.displayAvatarURL;
    errorEmbed = new discord.RichEmbed() //Embed als er geen reden is binnenhalen

        //Embed voor geen reden
        .setColor("RED")
        .setAuthor("Error", bicon)
        .setDescription("Voer een geldige reden in!");

    if (!onderwerp) return message.channel.send(errorEmbed); //als er geen args zijn

    let role = message.guild.roles.find(c => c.name === '-=-Official.Medw.Groente-=-'); //De role die toegang heeft tot de channel
    let role2 = message.guild.roles.find(c => c.name === '-=-Official.Medw.Kleding=-');
    let role3 = message.guild.roles.find(c => c.name === '@everyone'); //De role van iedereen
    // Als ticket al gemaakt is
    var bool = false;

    // Kijk na als ticket al gemaakt is.
    message.guild.channels.forEach((channel) => {

        // Als ticket is gemaakt, zend bericht.
        if (channel.name == "ticket-" + userName.toLowerCase()) {

            let dongembed = new discord.RichEmbed()
                .setColor("RED")
                .setAuthor("Error", bicon)
                .setDescription("<:xcross:504361310385995798> Je hebt al een ticket geopend!")
            message.channel.send(dongembed);

            bool = true;

        }

    });

    // Als ticket return code.
    if (bool == true) return;

    if (!role) return message.channel.send("Maak een rol met de naam -=-Official.Medw.Kleding=-= om tickets te gebruiken. ") //Als support rank er niet is
    message.guild.createChannel("ticket-" + userName, "text").then(c => {//Wat permissies voor de rolls
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role3, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        let bicon = client.user.displayAvatarURL; //De icoon van de bot
        const ticketEmbed = new discord.RichEmbed()
            .setAuthor("New ticket!", bicon)
            .addField("Ticket creator", `**${message.author}**`, true)
            .addField("Reason", `**${onderwerp}**`)
            .setThumbnail(`${message.author.avatarURL}`)
            .setColor("GREEN")
            .setDescription("Zet hier uw bestelling! U hebt 24 uur lang om uw bestelling op te halen! Kijk hier de voorraad: http://bit.ly/OfficialAlgemeenMt", true)
            .setTimestamp()
            .setFooter("Ticket created on:", bicon);
        c.send({ embed: ticketEmbed });

        c.setTopic(`Zet hier uw bestelling! U hebt 24 uur lang om uw bestelling op te halen! Kijk hier de voorraad: http://bit.ly/OfficialAlgemeenMt ! ${message.author}`) //De beschrijving van de channel

        const categoryId = "580006306702688256"; //Category ID plaats het binnen de "11111"
        c.setParent(categoryId) // Zet kanaal in category.

        geluktEmbed = new discord.RichEmbed()

            .setAuthor("Je ticket is gemaakt!", bicon)
            .setColor("GREEN")
            .setAuthor("Done", bicon)
            .setDescription(`e hebt met succes een ticket gemaakt. Zie #ticket-${message.author.username}${message.author.discriminator}`)

        message.channel.send(geluktEmbed);
        c.send("@everyone").then(message => message.delete(100)); // De @everyone tag
        return;
    }).catch(console.error);

}
exports.help = { //De export naar een echte CMD
    name: 'new' //Om de command aan te duiden dus bijvoorbeeld !help - !ticket etc.
};