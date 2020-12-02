const { getParsedData } = require('../utils');
const data = getParsedData('./data')

function parseEntry(entry) {
    if (!entry) return
    const split = entry.split(':');
    const rules = split[0];
    const password = split[1];
    if (!password) throw new Error(password);

    const [min, max, rule] = parseRules(rules)
    return validateTwo(min, max, rule, password)
}

function parseRules(rules) {
    const spaced = rules.replace(/-/, ' ');
    const split = spaced.split(' ');
    return split
}


// example passwords
// 1-3 a: abcde valid, min 1 a, max 3 a
// 1-3 b: cdefg
// 2-9 c: ccccccccc valid, min 2 c, max 3 c
function validateOne(min, max, rule, password) {
    const replaced = password.replace(new RegExp(`[^${rule}]`, 'g'), '');
    if (replaced.length > max || replaced.length < min) return false
    else return true
}


// 1-3 a: abcde is valid: position 1 contains a and position 3 does not.
// 1-3 b: cdefg is invalid: neither position 1 nor position 3 contains b.
// 2-9 c: ccccccccc is invalid: both position 2 and position 9 contain c.
// index by 1 not 0
function validateTwo(min, max, rule, password) {
    return password[min] === rule && password[max] !== rule 
    ||password[min] !== rule && password[max] === rule
}

const validNumber = data.reduce((sum, entry) => {
    if (parseEntry(entry)) return sum + 1
    else return sum
}, 0);

console.log(validNumber)
