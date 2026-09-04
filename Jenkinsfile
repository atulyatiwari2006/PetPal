pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Test') {
            steps {
                bat 'npm test'
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t petpal:latest .'
            }
        }
    }

    post {
        success {
            echo 'PetPal pipeline completed successfully.'
        }
        failure {
            echo 'PetPal pipeline failed. Check the stage logs.'
        }
    }
}