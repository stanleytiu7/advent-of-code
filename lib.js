const path = require('path');
const fs = require('fs');

function getRawInput() {
        const inputFilename = path.resolve(process.cwd(),
            path.basename('data.txt'))
                    // path.basename(process.argv[1], '.js').replace(/\D+$/, '') + '.txt');
        const input = fs.readFileSync(inputFilename, 'utf-8').trim();
        return input;
}

module.exports = ({
    getRawInput
})
