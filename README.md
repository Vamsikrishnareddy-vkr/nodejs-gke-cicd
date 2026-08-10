# Node.js GKE CI/CD Project

## Overview

This project demonstrates a complete DevOps CI/CD workflow for a Node.js application.

The application is containerized using Docker, built and tested through Jenkins, scanned using Trivy, and deployed to Kubernetes using Helm.

The current implementation is running on Docker Desktop Kubernetes. This allows the complete CI/CD and Kubernetes workflow to be developed and tested without requiring GCP billing.

The project is designed so that the Kubernetes deployment can later be moved to Google Kubernetes Engine (GKE).

---

## Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | Application runtime |
| Express | Web application framework |
| Git | Source code version control |
| GitHub | Source code repository |
| Jenkins | CI/CD automation |
| Docker | Application containerization |
| Trivy | Container vulnerability scanning |
| Kubernetes | Container orchestration |
| Docker Desktop | Local Kubernetes environment |
| Helm | Kubernetes package and deployment management |
| kubectl | Kubernetes command-line management |

---

## Application

The application is a Node.js application running on port `3000`.

The application provides a health endpoint:

```text
GET /health