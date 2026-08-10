# CI/CD Pipeline

## Overview

Jenkins is used to automate the build and deployment process.

The pipeline starts when a change is pushed to the GitHub main branch.

Developer
    |
    | git push
    v
GitHub
    |
    | Webhook
    v
Jenkins
    |
    +-- npm ci
    |
    +-- npm test
    |
    +-- Docker Build
    |
    +-- Trivy Scan
    |
    +-- Helm Deployment
    |
    +-- Kubernetes Rollout
    |
    +-- Health Check
    |
    v
Application Running