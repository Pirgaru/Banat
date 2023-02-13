const Discord = require("discord.js");
const client = new Discord.Client();
const ytdl = require("ytdl-core");

client.on("ready", () => {
  console.log("Bot-ul functioneaza patron!");
});

client.on("message", async message => {
  if (!message.content.startsWith("!") || message.author.bot) return;

  const args = message.content.slice(1).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "play") {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send(
        "Trebuie sa intri intr-un canal vocal baba mea daca vrei sa iti margă comanda!"
      );
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return message.channel.send(
        "Nu am primit inca permisiunea să ma alătur la canalul vocal, baba mea!"
      );
    }

    try {
      var connection = await voiceChannel.join({
        timeout: 30000
      });
      var stream = ytdl(args[0], { filter: "audioonly" });
      var dispatcher = connection.play(stream);
      message.channel.send("Se redă melodia: " + args[0]);
    } catch (error) {
      console.error(error);
      message.channel.send(error.message);
    }
  } else if (command === "skip") {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send(
        "Trebuie sa intri intr-un canal vocal baba mea daca vrei sa iti margă comanda!"
      );
    const dispatcher = voiceChannel.connection.dispatcher;
    if (!dispatcher)
      return message.channel.send("Baba mea, nu ai melodie in asteptare pentru a putea da skip!");
    dispatcher.end();
    message.channel.send("Muzica a fost sărită!");
  } else if (command === "stop") {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send(
        "Trebuie sa intri intr-un canal vocal baba mea daca vrei sa iti margă comanda!"
      );
    voiceChannel.leave();
    message.channel.send("Am fugit la somn baba mea");
  }
});

client.login("OTM2OTIzMzQyNDI5MDk3OTk1.GBk8R1.SiJG-Rxv7j8rXnGGn6B9SDya7tA_jMhicAQF_o");
