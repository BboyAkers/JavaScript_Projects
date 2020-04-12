require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if(msg.content === 'ping') {
    //replies back to the person with their @username
    msg.reply('pong');
    //Just say it in the channel no tagging usernames
    msg.channel.send('pong');
  } else if (msg.content.startsWith('!rating')) {
    if(msg.mentions.users.size) {
      const taggedUser = msg.mentions.user.first();
      msg.reply(`The user rating for ${taggedUser.username} is  98%`)
    } else {
      msg.reply('Please tag a valid user!');
    }
  }
})