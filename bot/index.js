const fs = require('fs')
const Discord = require('discord.js')

const BOT_TOKEN = process.env.BOT_TOKEN
const PREFIX = process.env.PREFIX.split(' ')

const client = new Discord.Client()
client.commands = new Discord.Collection()
client.cooldowns = new Discord.Collection()

const commandFolders = fs.readdirSync('./bot/commands')

for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./bot/commands/${folder}`).filter(file => file.endsWith('.js'))
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`)
    client.commands.set(command.name, command)
  }
}

client.on('ready', (evt) => {
  console.log(`Logged in as: ${client.user.tag}`)
})

client.on('message', async message => {
  const messagePrefix = PREFIX.find(pre => message.content.startsWith(pre))
  if (!messagePrefix || message.author.bot) return

  let args
  let commandName
  if (messagePrefix === '#') {
    args = message.content.slice(messagePrefix.length).trim().split(/ +/)
    if (args.every(element => typeof parseInt(element) === 'number')) {
      commandName = 'milvus'
    } else { return message.channel.send('Informe os chamados separados por número!') }
  } else {
    args = message.content.slice(messagePrefix.length).trim().split(/ +/)
    commandName = args.shift().toLowerCase()
  }
  if (!client.commands.has(commandName)) return

  const command = client.commands.get(commandName)

  if (command.args && !args.length) {
    let reply = `Você não providenciou nenhum argumento!, ${message.author}!`

    if (command.usage) {
      reply += `\nVocê precisa utilizar desta maneira: \`${PREFIX}${command.name} ${command.usage}\``
    }

    return message.channel.send(reply)
  }

  const { cooldowns } = client

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection())
  }

  const now = Date.now()
  const timestamps = cooldowns.get(command.name)
  const cooldownAmount = (command.cooldown || 3) * 1000

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000
      return message.reply(`por favor, aguarde ${timeLeft.toFixed(1)} segundos antes de usar o comando \`${command.name}\` novamente.`)
    }
  }

  timestamps.set(message.author.id, now)
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

  try {
    command.execute(message, args)
  } catch (error) {
    console.error(error)
    message.reply('Ops...!')
  }
})

client.login(BOT_TOKEN)
