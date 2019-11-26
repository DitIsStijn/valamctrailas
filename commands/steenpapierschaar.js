module.exports.run = async (bot, Message, args) => {

    if(!args[0]) return message.channel.send("Gebruik: sps <steen, papier, schaar>");

    var options = ["steen", "papier", "schaar"];

    var result = options[Math.floor(Math.random() * options.length)];

    if(args[0] == "steen"){

        if(result == "papier"){

            message.channel.send(`Ik heb ${result} :notepad_spiral, Ik win.`);

        }else if(result == "schaar"){
            message.channel.send(`Ik heb ${result} :scissors:, Jij wint`);

        }else if(result == "steen"){
            message.channel.send(`Ik heb ${result} :moyai:, het is gelijkspel`);
        }

    }

}

module.exports.help = {
    name: "sps"
}