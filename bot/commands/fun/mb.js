module.exports = {
  name: 'mb',
  description: 'Elogiar alguém mencionado',
  args: true,
  usage: '<mention>',
  execute (message, args) {
    message.channel.send('Olha só, parece que alguém mandou bem por aqui!!! Parabéns @')
  }
}

// if (command === ('mb')) {
//     if (args.length < 1) {
//       return message.reply('Opa, chapa, faltou falar quem!')
//     }

//     const taggedUser = message.mentions.users.first()
//     message.channel.send(`Olha olha, alguém mandou bem por aqui!! -> @${taggedUser.username}`)
//   }
