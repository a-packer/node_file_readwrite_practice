const fs = require('fs');
const process = require('process');

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

cat(process.argv[2])