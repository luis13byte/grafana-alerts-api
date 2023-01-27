const express = require('express')
const router = express.Router()
const alertController = require('../../controllers/alertController')

router
  .post('/', alertController.receiveGrafanaWebhook)

module.exports = router
