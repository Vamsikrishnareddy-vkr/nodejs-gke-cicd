pipeline {
    agent any

    environment {
        APP_NAME = "nodejs-gke-cicd"
        IMAGE_TAG = "${BUILD_NUMBER}"
        CONTAINER_NAME = "nodejs-ci-test"
        TRIVY = "C:\\Users\\Vamsi Krishna\\Downloads\\trivy_0.73.0_Windows-64bit\\trivy.exe"
    }

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
                bat 'docker build --pull -t %APP_NAME%:%IMAGE_TAG% .'
            }
        }

        stage('Verify Kubernetes Tools') {
            steps {
                withCredentials([file(credentialsId: 'docker-desktop-kubeconfig', variable: 'KUBECONFIG')]) {
            bat '"C:\\Program Files\\Docker\\Docker\\resources\\bin\\kubectl.exe" config current-context'
            bat '"C:\\Program Files\\Docker\\Docker\\resources\\bin\\kubectl.exe" get nodes'
            bat '"C:\\Users\\Vamsi Krishna\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Helm.Helm_Microsoft.Winget.Source_8wekyb3d8bbwe\\windows-amd64\\helm.exe" list'
        }
    }
}

        stage('Trivy Security Scan') {
            steps {
                echo "Scanning Docker image: %APP_NAME%:%IMAGE_TAG%"

                bat '"%TRIVY%" image --severity HIGH,CRITICAL --exit-code 0 %APP_NAME%:%IMAGE_TAG%'
            }
        }

        stage('Docker Run') {
            steps {
                bat 'docker rm -f %CONTAINER_NAME% 2>nul || exit /b 0'
                bat 'docker run -d --name %CONTAINER_NAME% -p 3100:3000 %APP_NAME%:%IMAGE_TAG%'
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
            bat 'docker rm -f %CONTAINER_NAME% 2>nul || exit /b 0'
        }
    }
}