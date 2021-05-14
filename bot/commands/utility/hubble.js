const axios = require('axios')
const url = 'https://api-hubble.wap.ind.br/ping'
module.exports = {
  name: 'hubble',
  cooldown: 5,
  description: 'Hubble!',
  execute(message, args) {
    text(message, args)
  },
}

const text = async (message, args) => {
  const res = await axios.get(url).catch(() => {
    return {data: 'Erro ao Comunicar com o Hubble'}
  })
  message.channel.send(res.data)
}
