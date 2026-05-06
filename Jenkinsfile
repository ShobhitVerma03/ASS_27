pipeline {
    agent any

    environment {
        DOCKER_COMPOSE = 'docker-compose'
    }

    stages {
        stage('Environment Check') {
            steps {
                bat 'docker --version'
                bat 'docker-compose --version'
            }
        }
        stage('Checkout') {
            steps {
                // Jenkins usually handles this via the job configuration
                echo 'Checking out code...'
            }
        }

        stage('Build and Deploy') {
            steps {
                script {
                    echo 'Cleaning up existing containers...'
                    bat "${DOCKER_COMPOSE} down --remove-orphans"
                    echo 'Starting Docker Compose Build and Deploy...'
                    // Build and run in detached mode
                    bat "${DOCKER_COMPOSE} up --build -d"
                }
            }
        }

        stage('Verify') {
            steps {
                script {
                    echo 'Verifying running containers...'
                    bat "docker ps"
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.'
        }
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed. Check logs.'
        }
    }
}
