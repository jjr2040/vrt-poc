const compareImages = require('resemblejs/compareImages');
const fs = require('mz/fs');
const ejs = require('ejs');

async function diffImages() {
  const options = {
    output: {
      errorColor: {
        red: 255,
        green: 0, 
        blue: 255
      },
      errorType: 'movement',
      transparency: 0.3,
      largeImageThreshold: 1200,
      userCrossOrigin: false,
      outputDiff: true
    },
    scaleToSameSize: true,
    ignore: 'antialiasing'
  };

  const screenshotsDir = './cypress/screenshots/taller/color-palette.spec.js/';
  const imageOneName = 'color-palette-one.png';
  const imageTwoName = 'color-palette-two.png';
  const imageOutputName = 'output.png';
  const imageOnePath = screenshotsDir + imageOneName;
  const imageTwoPath = screenshotsDir + imageTwoName;
  const imageOutputPath = screenshotsDir + imageOutputName;
  const imageOne = await fs.readFile(imageOnePath);
  const imageTwo = await fs.readFile(imageTwoPath);
  const data = await compareImages(imageOne, imageTwo, options);

  await fs.writeFile(imageOutputPath, data.getBuffer());

  const outputScreenshotsDir = './output/images/screenshots/'

  if ( !fs.existsSync(outputScreenshotsDir)) {
    await fs.mkdir(outputScreenshotsDir);
  }
  
  await fs.copyFile(imageOnePath, outputScreenshotsDir + imageOneName).catch( err => {
    console.log('Error copying image: ' +  err);
  });
  await fs.copyFile(imageTwoPath, outputScreenshotsDir + imageTwoName);
  await fs.copyFile(imageOutputPath, outputScreenshotsDir + imageOutputName);

  const templateData = { 
    imageOneName: imageOneName, 
    imageTwoName: imageTwoName, 
    imageComparedName: imageOutputName
  };
  const report = await ejs.renderFile('./templates/vrt-report.ejs', templateData, { async: true });

  fs.writeFile('./output/index.html', Buffer.from(report));
};

diffImages();