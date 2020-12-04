// take aways, objects are more flexible than arrays.
// you can use lengths in regexs. Groups followed by {#} 
// will limit that group to the number of chars specified

const fs = require('fs')

/**
 * parse the passports to rows
 */
function parseInput(str) {
        return str.split('\n\n').map(block => {
            const result = {};
            block.replace(/\n/g, ' ').split(' ')
                .map(x => x.split(':'))
                .forEach(x => result[x[0]] = x[1]);
            return result;
        });
}

/**
 * this is the dumb way I was doing it before, and using a parser to get the info
 */
// function parseData(data) {
//     const passports = data.split('\n').join(' ').split('  ')
//     return passports
// }

const unparsed_data = fs.readFileSync('./data', 'utf-8');
const data = parseInput(unparsed_data)


const requiredFields = {
    byr: (v) => {
        return /^\d{4}$/.test(v) && v >= 1920 && v <= 2002
    },
    iyr: (v) => {
        return /^\d{4}$/.test(v) && v >= 2010 && v <= 2020
    },
    eyr: (v) => {
        return /^\d{4}$/.test(v) && v >= 2020 && v <= 2030
    },
    hgt: (v) => {
        const nums = +v.slice(0, v.length-2);
        if (nums === NaN) throw new Error('Wrong')
        if (v.slice(-2) === 'cm') {
            return nums >= 150 && nums <= 193
        } else if (v.slice(-2) === 'in') {
            return nums >= 59 && nums <= 76
        } else {
            return false
        }
    },
    hcl: (v) => {
        return /^#[0-9a-f]{6}$/.test(v)
    },
    ecl: (v) => {
        return ['amb','blu','brn','gry','grn','hzl','oth'].includes(v)
    },
    pid: (v) => {
        return /^[0-9]{9}$/.test(v)
    }
}

const optionalFields = ['cid']

/**
 * get the keys from the passport row
 * this ends up being unnecessary with the new parser
 */
// function parseRow(row) {
//     const split = row.split(' ');
//     const parseKeys = split.map(v=> {
//         const [key, val] = v.split(':');
//     })

//     const final = split.reduce((accum, v) => {
//         const [key, value] = v.split(':');
//         accum[key] = value;
//         return accum;
//     },{})
//     return final;
// }

/**
 * validate the row against the required fields
 * we look at the required keys, and filter against the provided.
 * If the key exists and the data is valid, we filter out the requiredField from the array
 *
 * We then check for length to see if any required fields are left invalid.
 * A more optimal solution could check for all valid keys first before running the validations
 * for the data
 */
function validateRow(row, requiredFields) {
    const required = Object.keys(requiredFields);
    const filtered = required.filter(v => {
        const validateFn = requiredFields[v];
        if(row[v]) {
            return !validateFn(row[v])
        }
        return true
    })
    return !filtered.length;
}

let sum = 0;
for (const row of data) {
    sum += validateRow(row, requiredFields);
}
 console.log(sum)
