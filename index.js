require('dotenv').config()
const express = require('express')
const basicAuth = require('express-basic-auth')

const v1AlertRouter = require('./src/v1/routes/alertRoutes')

// Start Express -----------------
const app = express()

if (process.env.NODE_ENV !== 'test') { // prevent EADDRINUSE in parallel tests
  app.set('port', process.env.APP_PORT || 9000)
}

// Middlewares -------------------
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(basicAuth({
  users: { adm_grafanaapi: process.env.BASIC_AUTH }
}))

// Routes ------------------------
app.get('/api', (req, res) => {
  res.send('Welcome to the API')
})

app.use('/api/v1/alerts', v1AlertRouter)

// Server running ----------------
const server = app.listen(app.get('port'), function () {
  console.log(`🚀 Server listening on port ${app.get('port')}`)
})

module.exports = { app, server }
