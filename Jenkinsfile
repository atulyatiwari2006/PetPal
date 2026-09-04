pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                bat 'echo PetPal has no external dependencies'
            }
        }

        stage('Test') {
            steps {
                bat 'node --test tests\\server.test.js'
            }
        }

        stage('Build') {
            steps {
                bat 'node --check pages\\Chaitanya\\server.js'
            }
        }
    }
}