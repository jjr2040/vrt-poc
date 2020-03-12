pipeline {
  agent any
  stages {
    stage('VRT') {
      steps {
        nodejs('nodejs') {
          sh 'yarn install'
          sh 'yarn run cypress run -s \'cypress/integration/taller/color-palette.spec.js\''
          sh 'node vrt.js'
        }
        publishHTML([allowMissing: false, 
          alwaysLinkToLastBuild: true, 
          keepAll: true, 
          reportDir: 'output', 
          reportFiles: 'index.html', 
          reportName: 'HTML Report', 
          reportTitles: ''])

      }
    }

  }
}