const Discord = require('discord.js');
const settings = {
  ws: {
    properties: { $browser: "Discord iOS" }
  }
};
const client = new Discord.Client(settings);
const token = require('./token.json').token;
const utterances = require('./utterances.json').utterances;
const creationTrigger = '|creation';

function getWord() {
  return utterances[Math.floor(Math.random() * utterances.length)].toUpperCase() + " ";
}

function isAlpha(str) {
  var code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (!(code > 64 && code < 91) && !(code > 96 && code < 123)) {
      return false;
      }
    }
  return true;
};

function learify(text) {
  if (text.includes(" ")) {
    let ret = "";
    text.split(" ").forEach((word) => {
      if (isAlpha(word)) ret += getWord();
      else ret += word + " ";
      });
    return ret;
    } else {
      return "LEARSENSE";
      }
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("GitHub", {
    type: "WATCHING",
    url: "https://github.com/skylerspaeth/LearSense"
  });
  });

client.on('message', msg => {
  let guild = msg.guild;
  if (msg.content.startsWith(creationTrigger)) {
    if (msg.mentions.users.first()) {
      msg.reply(`${msg.mentions.users.first().username} was created on ${msg.mentions.users.first().createdAt.toLocaleDateString()}`);
      } else {
        msg.reply(`You were created on ${msg.author.createdAt.toLocaleDateString()}. Mention a user next time you run the ${creationTrigger} command to find out when they were created! For instance: |creation @User#1234`);
        }
    }
  if ((msg.channel.name === 'lear' || msg.channel.name === 'sense') && msg.author.id !== client.user.id && !(msg.content.startsWith(creationTrigger))) {
    msg.channel.send([
      `${guild.member(msg.author) ? guild.member(msg.author).displayName : msg.author.username} said: "${learify(msg.content)}"`,
      `LearLang Translation: "${learify(msg.content)}"`
      ][Math.floor(Math.random() * 2)]);
    }
  });

client.login(token);
