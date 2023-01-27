const k8s = require('@kubernetes/client-node')
const fs = require('fs')
const yaml = require('js-yaml')

let kubeconfigData
try {
  const fileContent = fs.readFileSync('kubeconfig.yaml', 'utf8')
  kubeconfigData = yaml.load(fileContent)
} catch (err) {
  console.log(err)
}

const kc = new k8s.KubeConfig()
kc.loadFromString(JSON.stringify(kubeconfigData))

const k8sApps = kc.makeApiClient(k8s.AppsV1Api)

module.exports = {
  k8sApps
}
