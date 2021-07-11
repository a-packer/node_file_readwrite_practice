const fs = require('fs');
const process = require('process');
const axios = require('axios');

// function cat(path) {

//     fs.readFile(path, 'utf8', function(err, data) {
//         if (err) {
//             // handle possible error: kill the process and tell the shell it errored
//             console.error(err);
//             process.exit(1);
//         }
//         console.log(`file contents: ${data}`);
//     });
// }

// cat(process.argv[2])


function webCat(url) {
    console.log("webCat function")
    axios.get(url)
        .then(function(resp) {
            console.log(resp.data.slice(0, 80), '...');
});
}

webCat('http://google.com')