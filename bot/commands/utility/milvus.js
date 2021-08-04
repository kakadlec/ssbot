const axios = require('axios')
const url = 'https://apiintegracao.milvus.com.br/api/chamado/listagem'

module.exports = {
  name: 'milvus',
  cooldown: 5,
  description: 'Consulta chamado!',
  execute (message, args) {
    text(message, args)
  }
}

const text = async (message, args) => {
  // const res = await axios.get(url).catch(() => {
  // return { data: 'Erro ao Comunicar com o Hubble' }
  // })
  message.channel.send(`${args[0]}`)
}

// https://portal.milvus.com.br/#/help-desk/chamado/${chamado}
