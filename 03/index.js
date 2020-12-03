// take aways, use modulo rather than trying to manually loop

const {getParsedData} = require('../utils');
const data = getParsedData('./data')

// data each entry is a row, and each string position is a y

function traverse(chart) {
    return ([x,y], [x_slope, y_slope]) => {
        return getPosition(chart)([x+x_slope, y-y_slope])
    };
}

function checkTrees(chart) {
    return (x,y) => {
        const char = chart[y][x]
        // console.log(x,y, char)
        if (char === '#') {
            return 1
        } else if (!char){
            throw new Error('something went wrong')
        } else {
            return 0
        }
    }
}

function getPosition(chart) {
    const x_max_index = chart[0].length-1
    const y_max_index = chart.length-1
    return ([x,y]) => {
        if (x > x_max_index) {
            x = x-x_max_index-1 // by subtracting 1 we account for 0
        }
        return [x,y]
    }
}

function getTreeCollisions(data, x_slope, y_slope){
    let x = 0;
    let y = 0;

    const traverseChart = traverse(data)

    let treesEncountered = 0;

    while(y <= data.length-1) {
        treesEncountered += checkTrees(data)(x,y);
        [x,y] = traverseChart([x,y], [x_slope, y_slope])
    }
    return treesEncountered
}

const slopes = [[1,-1], [3,-1], [5,-1],[7,-1],[1,-2]]

let product = 1;
for (const pair of slopes) {
    product *= getTreeCollisions(data, pair[0], pair[1])
}
// console.log(product)
