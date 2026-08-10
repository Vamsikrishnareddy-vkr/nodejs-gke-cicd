replicas: 2

strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 1
    maxUnavailable: 0

kubectl rollout status deployment/nodejs-gke-cicd
kubectl rollout history deployment/nodejs-gke-cicd
kubectl rollout undo deployment/nodejs-gke-cicd