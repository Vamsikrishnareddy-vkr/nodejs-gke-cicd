# Node.js GKE CI/CD

This project demonstrates a Jenkins CI pipeline for a Node.js application

## CI/CD Pipeline

The Jenkins pipeline performs the following stages:

- Checkout source code from GitHub
- Install Node.js dependencies
- Run automated tests
- Build Docker image
- Run Docker container
- Perform application health check
- Clean up the test container

## Technologies

- Node.js
- Express.js
- Docker
- Jenkins
- Git
- GitHub