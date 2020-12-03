const fs = require('fs');
module.exports = function parseDataSync(relativeFilePath, format='utf8') {
    const data = fs.readFileSync(relativeFilePath, format)
    const split = data.split("\n").filter(v => v !== "" && v !== undefined)
    return split
}
