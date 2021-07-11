const fs = require('fs');
const process = require('process');
const axios = require('axios');


function handleOutput(text, output) {
    if (output) {
      fs.writeFile(output, text, 'utf8', function(err) {
        if (err) {
          console.error(`Error. Failed to write to ${output}: ${err}`);
          process.exit(1);
        }
        else {
            console.log(`Wrote to file ${output}`)
        }
      });
    } else {
      console.log(text); // no output file, just print the text
    }
  }

function cat(fileToRead, output) {
    // read text file from fileToRead
    fs.readFile(fileToRead, 'utf8', function(err, data) {
      if (err) {
        console.error(`Error. Failed to Read File: ${err}`);
        process.exit(1);
      } else {
        handleOutput(data, output);
      }
    });
  }

async function webCat(url, output) {
    // read webpage content from url
    try {
      let res = await axios.get(url);
      handleOutput(res.data, output);
    } catch (err) {
      console.error(`Error: ${err}`);
      process.exit(1);
    }
  }

let fileToRead;
let output;

// determine if outputing to a file or just console.logging
if (process.argv[2] === '--out') {
  output = process.argv[3]; // output file name
  fileToRead = process.argv[4]; // file to read
} else {
  fileToRead = process.argv[2]; // no output
}

// check to see if fileToRead is a url or regular text file
if (fileToRead.includes('http://')) {
  webCat(fileToRead, output); // run webCat function 
} else {
  cat(fileToRead, output); // run cat function
}
    