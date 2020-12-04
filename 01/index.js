const { getRawInput } = require('../lib')

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
        throw new Error('Array too small pairSum');
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
    if (arr.length < 3) {
        throw new Error('Array too small threeSum');
    }
    for (let i = 0; i < arr.length; i++) {
        const returned = pairSum(arr.slice(i+1), targetSum-arr[i])
        if (returned) {
            return [arr[i], ...returned]
        }    
    }
    return null
}


const data = getRawInput().split('\n')
    // .map(val => parseInt(val));
getAnswer(data, 2020);
