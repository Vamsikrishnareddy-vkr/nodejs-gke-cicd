pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test'
            }
        }

        stage('Docker Build') {
            steps {
                bat "docker build -t nodejs-gke-cicd:%BUILD_NUMBER% ."
            }
        }

        stage('Docker Run') {
            steps {
                bat "docker run -d --name nodejs-ci-test -p 3100:3000 nodejs-gke-cicd:%BUILD_NUMBER%"
            }
        }

       stage('Health Check') {
    steps {
        retry(5) {
            sleep 2
            bat 'curl --fail http://localhost:3100/health'
        }
    }
}
    }

    post {
        always {
            bat 'docker rm -f nodejs-ci-test 2>nul || exit /b 0'
        }
    }
}