const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path) {

    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            // handle possible error: kill the process and tell the shell it errored
            console.error(err);
            process.exit(1);
        }
        console.log(`file contents: ${data}`);
    });
}


function webCat(url) {
    axios.get(url)
        .then(function(resp) {
            // console.log(the first 20 characters of response followed by an elipsis)
            console.log(resp.data.slice(0, 20), '...');
        })
        // handle error
        .catch(err => console.log(err))
}

// check args to see if arg is a url, if not, assume it's a path
arg = process.argv[2]
if (arg.includes('http://')) {
    webCat(arg)
}
else {
    cat(arg)
}