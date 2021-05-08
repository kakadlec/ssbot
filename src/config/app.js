const app = require('express')()
const setupMiddlewares = require('./middlewares')
const setupRoutes = require('./routes')
require('../services/bot')

setupMiddlewares(app)
setupRoutes(app)

module.exports = app
