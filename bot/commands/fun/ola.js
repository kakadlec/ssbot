module.exports = {
  name: 'ola',
  description: 'Boas vindas!',
  execute (message, args) {
    message.channel.send('Seja bem vindo!')
  }
}
