const express = require('express')

const helmet = require('helmet')
const cors = require('cors')
const log = require('./log')

module.exports = (app) => {
  app.use(express.json())
  app.use(helmet())
  app.use(cors())
  app.use(log)
}
