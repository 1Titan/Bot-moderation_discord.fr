const Discord = require("discord.js");
const fs = require('fs');
const kills = require('../killed.json');

exports.run = (client, message, args) => {
  const target = message.mentions.users.first();

  if (!target)
    return message.channel.send(`${message.author} se sont tués. 💀`);

  const id = target.id;
  let deathCount = kills[id];

  if (!deathCount) {
    kills[id] = 1;

    const emb = new Discord.RichEmbed()
      .setColor('#0099ff')
      .addField(`${message.author} tué ${target.tag} 🔪`, `${target.tag} a été tué pour la première fois !`, true)
      .setImage('https://i.imgur.com/7MkzxTT.gif')

    message.channel.send(emb);

  } else {
    deathCount = (kills[id] = kills[id] + 1);

    const emb = new Discord.RichEmbed()
      .setColor('#0099ff')
      .addField(`${message.author} tué ${target.tag} 🔪`, `${target.tag} a été tué ${deathCount} fois !`, true)
      .setImage('https://i.imgur.com/7MkzxTT.gif')

    message.channel.send(emb);

  }

  // Update kills file
  fs.writeFileSync(
    "./killed.json",
    JSON.stringify(kills),
    (err) => console.log(err)
  );
}