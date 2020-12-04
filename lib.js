const path = require('path');
const chalk = require('chalk');
const fs = require('fs');

function getRawInput() {
    const inputFilename = path.resolve(process.cwd(), 'data',
        path.basename(process.argv[1], '.js').replace(/\D+/, '') + '.txt')
    console.log(chalk.red(`Reading from ${inputFilename}`))
    const input = fs.readFileSync(inputFilename, 'utf-8').trim();
    return input;
}

module.exports = {
    getRawInput,
    chalk
}
