#!/usr/bin/env node
'use strict';
const { program } = require('commander');
const fs = require('mz/fs');
const compareImages = require('resemblejs/compareImages');

const diffImage = async (imageOnePath, imageTwoPath, outputImage) => {
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
    ignore: 'less'
  };

  const imageOne = await fs.readFile(imageOnePath);
  const imageTwo = await fs.readFile(imageTwoPath);
  const data = await compareImages(imageOne, imageTwo, options);

  await fs.writeFile(outputImage, data.getBuffer());
};

program
  .description('Compare to images using ResembleJS') 
  .arguments('<imageOne> <imageTwo> <outputImage>')
  .action(diffImage);

program.parse(process.argv);