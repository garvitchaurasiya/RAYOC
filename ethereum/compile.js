const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath); // This will delete the folder if it exists.


const CollegeRatingPath = path.resolve(__dirname, 'contracts', 'CollegeRating.sol');
const source = fs.readFileSync(CollegeRatingPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'CollegeRating.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

fs.ensureDirSync(buildPath); //As we have deleted the 'build' folder above we have to create it before writing something into it. ensureDir checks if a folder with this path exists and if it doesn't it will create it for us.

var output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['CollegeRating.sol'].CollegeRating;
fs.outputJsonSync( // It will write some json file to the specified directory.
  path.resolve(buildPath, 'CollegeRating' + '.json'),
  output // This second argument is the content we want to write into the file
);
