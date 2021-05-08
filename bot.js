const Discord = require('discord.js')

const BOT_TOKEN = process.env.BOT_TOKEN

const bot = new Discord.Client()
bot.login(BOT_TOKEN)

bot.on('ready', (evt) => {
  console.log(`Logged in as: ${bot.user.tag}`)
})

bot.on('message', async msg => {
  if (msg.content.startsWith('!ola')) {
    return msg.reply('Seja bem vindo!!')
  }
  if (msg.content === '!ping') {
    msg.channel.send('pong')
  }
  if (msg.content === '!git') {
    msg.reply('Contribua! -> https://github.com/kakadlec/ssbot')
  }
})
