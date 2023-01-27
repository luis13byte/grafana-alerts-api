const { k8sApps } = require('../utils/kubeClientNode')

const scaleReplicas = async ({ target, ns, nreplicas }) => {
  try {
    const res = await k8sApps.readNamespacedDeployment(target, ns)

    const deployment = res.body
    deployment.spec.replicas = nreplicas

    await k8sApps.replaceNamespacedDeployment(target, ns, deployment)
  } catch (err) {
    return err
  }
}

module.exports = {
  scaleReplicas
}
