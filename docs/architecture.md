# Architecture

## Overview

This project implements an end-to-end CI/CD pipeline for a containerized Node.js application.

The current implementation is validated locally using Docker Desktop Kubernetes, so GCP billing is not required.

The project architecture can later be adapted to Google Kubernetes Engine (GKE).

## Architecture Flow

```text
Developer
    |
    | git push
    v
GitHub Repository
    |
    | Webhook
    v
Jenkins
    |
    +--> npm ci
    |
    +--> npm test
    |
    +--> Docker Build
    |
    +--> Trivy Security Scan
    |
    +--> Helm Upgrade
    |
    v
Docker Desktop Kubernetes
    |
    +--> Deployment
    |
    +--> 2 Application Pods
    |
    +--> Rolling Update
    |
    v
NodePort Service
    |
    v
Node.js Application
    |
    v
/health