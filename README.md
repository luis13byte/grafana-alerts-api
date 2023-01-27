# GrafanaAlertsApi
Application that works as a "Contact point" to receive the webhooks sent by Grafana.

The goal is to act on alerts received. This is intended so that the response processes are only Kubernetes operations, such as scaling, redeploy, job execution, etc.

This way there is flexibility to prepare another solution or response action in a container, which could be invoked as a Job as an example. 

## Quick start
You will need to place 2 files:
- **.env**: to set the BASIC_AUTH variable, since the API is protected.
- **kubeconfig.yaml**: it must contain the access configuration of a user, with permissions for the operations you want to perform inside the cluster.

Now you can install the dependencies and start the project.
~~~
npm install
npm run start
~~~

## Testing tip
When configuring Grafana, you can test a Contact Point before saving it, so that this test can reach the application, I recommend using [Ngrok](https://ngrok.com) to expose the application publicly.

This way you can test the behavior of sending different Grafana Labels before uploading it to production. 
