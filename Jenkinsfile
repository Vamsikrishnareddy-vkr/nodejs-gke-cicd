pipeline {
    agent any

    environment {
        APP_NAME = "nodejs-gke-cicd"
        IMAGE_TAG = "${BUILD_NUMBER}"
        TRIVY = "C:\\Users\\Vamsi Krishna\\Downloads\\trivy_0.73.0_Windows-64bit\\trivy.exe"
        HELM = "C:\\Users\\Vamsi Krishna\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Helm.Helm_Microsoft.Winget.Source_8wekyb3d8bbwe\\windows-amd64\\helm.exe"
        KUBECTL = "C:\\Program Files\\Docker\\Docker\\resources\\bin\\kubectl.exe"
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

        stage('Trivy Security Scan') {
            steps {
                echo "Scanning Docker image: ${APP_NAME}:${IMAGE_TAG}"

                bat '"%TRIVY%" image --severity HIGH,CRITICAL --exit-code 0 %APP_NAME%:%IMAGE_TAG%'
            }
        }

        stage('Helm Deploy') {
            steps {
                withCredentials([
                    file(
                        credentialsId: 'docker-desktop-kubeconfig',
                        variable: 'KUBECONFIG'
                    )
                ]) {
                    bat '"%HELM%" upgrade --install nodejs-gke-cicd helm\\nodejs-gke-cicd --set image.tag=%BUILD_NUMBER%'
                }
            }
        }

        stage('Kubernetes Rollout') {
            steps {
                withCredentials([
                    file(
                        credentialsId: 'docker-desktop-kubeconfig',
                        variable: 'KUBECONFIG'
                    )
                ]) {
                    bat '"%KUBECTL%" rollout status deployment/nodejs-gke-cicd --timeout=120s'
                }
            }
        }

        stage('Health Check') {
            steps {
                retry(5) {
                    sleep 2
                    bat 'curl --fail http://localhost:30081/health'
                }
            }
        }
    }

    post {
        always {
            echo "CI/CD pipeline completed."
        }
    }
}