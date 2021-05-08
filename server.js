const fastify = require('fastify')({ logger: true })
require('./bot')

fastify.get('/', async (request, reply) => {
  return { message: 'SSBot is awake!' }
})

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
