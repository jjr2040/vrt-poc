pipeline {
  agent any
  stages {
    stage('VRT') {
      steps {
        nodejs('nodejs') {
          sh 'yarn run cypress run -s \'cypress/integration/taller/color-palette.spec.js\''
          sh 'node vrt.js'
        }

      }
    }

  }
}