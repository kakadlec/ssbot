const axios = require('axios')
const url = 'https://apiintegracao.milvus.com.br/api/chamado/listagem'

module.exports = {
  name: 'milvus',
  cooldown: 5,
  description: 'Consulta chamado!',
  args: true,
  execute (message, args) {
    text(message, args)
  }
}

const text = async (message, args) => {
  const body = {
    filtro_body: {
      codigo: args[0]
    }
  }
  const res = await axios.post(url, body, {
    headers: {
      Authorization: process.env.MILVUS_TOKEN
    }
  }).catch(() => {
    return { data: 'Erro ao Comunicar com o Hubble' }
  })
  let msg = `Ei chapa! Toma uma ajudinha aí: https://portal.milvus.com.br/#/help-desk/chamado/${res.data.lista[0].id}`
  msg += `\nAssunto: **${res.data.lista[0].assunto}**.`
  msg += `\nMesa: **${res.data.lista[0].mesa_trabalho}**.`
  msg += `\nSLA: **${res.data.lista[0].sla.status_sla_solucao}**.` 
  message.channel.send(msg)
}
