const fs = require('fs');

function parseDataSync(relativeFilePath, format='utf8') {
    const data = fs.readFileSync(relativeFilePath, format)
    const splitData = data.split("\n");
    return splitData.map(val => parseInt(val));
}

function getAnswer(arr, targetSum) {
    if (!arr || !targetSum) throw new Error('Wtf');
    const answerArr = threeSum(arr, targetSum);
    if (answerArr) {
        const answer = answerArr.reduce((product, val) => {
            return product * val
        }, 1);
        console.log(answer)
    } else {
        console.log('did not find anything useful')
    }
}

function pairSum(arr, targetSum) {
    const cache = {};
    if (arr.length < 2) {
        throw new Error('Out of bounds pairSum');
    }
    for (const num of arr) {
        if (!cache[num]) {
            cache[targetSum - num] = true
        } else {
            return [num, targetSum-num]
        }
    }
    return null;
}

function threeSum(arr, targetSum) {
    for (let i = 0; i < arr.length-2; i++) {
        const subArr = arr.slice(i+1)
        const returned = pairSum(subArr, targetSum-arr[i])
        if (returned) {
            return [arr[i], ...returned]
        }    
    }
    throw new Error('Three sum needs to find something');
}


const data = parseDataSync('./data');
getAnswer(data, 2020);
