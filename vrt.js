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

  const imageOne = await fs.readFile(screenshotsDir + 'color-palette-one.png');
  const imageTwo = await fs.readFile(screenshotsDir + 'color-palette-two.png');
  const data = await compareImages(imageOne, imageTwo, options);

  await fs.writeFile(screenshotsDir + 'output.png', data.getBuffer());

  const report = await ejs.renderFile('./templates/vrt-report.ejs', { names: ['Juan', 'Jose', 'Villegas'] }, { async: true });

  fs.writeFile('./output/index.html', Buffer.from(report));
};

diffImages();