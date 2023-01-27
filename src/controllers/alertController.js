const k8sAppsOpsService = require('../services/k8sAppsOps')

const receiveGrafanaWebhook = async (req, res) => {
  const schemaValues = req.body

  console.log('--------- Received: ----------')
  console.log(schemaValues)
  console.log('------------------------------')

  if (schemaValues.commonLabels.alertname === 'ExampleApi restart required') {
    const target = 'exampleapi'
    const ns = 'production'
    try {
      k8sAppsOpsService.scaleReplicas({ target, ns, nreplicas: 0 })
        .then(() => k8sAppsOpsService.scaleReplicas({ target, ns, nreplicas: 2 }))

      console.log(target + ' redeployed')
    } catch (err) {
      console.log(err)
    }
  }

  if (schemaValues.commonLabels.alertname === 'Proxy app at full capacity') {
    const targets = ['proxy-good', 'proxy-medium']
    const ns = 'production'
    for (const target of targets) {
      try {
        k8sAppsOpsService.scaleReplicas({ target, ns, nreplicas: 0 })
          .then(() => k8sAppsOpsService.scaleReplicas({ target, ns, nreplicas: 1 }))

        console.log(target + ' redeployed')
      } catch (err) {
        console.log(err)
      }
    }
  }
}

module.exports = {
  receiveGrafanaWebhook
}
