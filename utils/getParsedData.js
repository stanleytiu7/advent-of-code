const fs = require('fs');
module.exports = function parseDataSync(relativeFilePath, format='utf8') {
    const data = fs.readFileSync(relativeFilePath, format)
    return data.split("\n");
}
