const fs = require('fs')


/**
 * parse the passports to rows
 */
function parseData(data) {
    const passports = data.split('\n').join(' ').split('  ')
    return passports
}

const unparsed_data = fs.readFileSync('./data', 'utf-8');
const data = parseData(unparsed_data)


const requiredFields = {
// byr (Birth Year) - four digits; at least 1920 and at most 2002.
    byr: (v) => {
        return v.length === 4 && v >= 1920 && v <= 2002
    },
// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    iyr: (v) => {
        return v.length === 4 && v >=2010 && v <= 2020
    },
// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
    eyr: (v) => {
        return v.length === 4 && v >= 2020 && v <= 2030
    },
// hgt (Height) - a number followed by either cm or in:
// If cm, the number must be at least 150 and at most 193.
// If in, the number must be at least 59 and at most 76.
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
// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    hcl: (v) => {
        if (/^#/.test(v) && v.length === 7) {
            return /[0-9a-f]/.test(v)
        } else {
            return false
        }
    },
// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    ecl: (v) => {
        return ['amb','blu','brn','gry','grn','hzl','oth'].includes(v)
    },
// pid (Passport ID) - a nine-digit number, including leading zeroes.
    pid: (v) => {
        return v.length === 9 && /^[0-9]+$/.test(v)
    }
}

// cid (Country ID) - ignored, missing or not.
const optionalFields = ['cid']

/**
 * get the keys from the passport row
 */
function parseRow(row) {
    const split = row.split(' ');
    const parseKeys = split.map(v=> {
        const [key, val] = v.split(':');
    })

    const final = split.reduce((accum, v) => {
        const [key, value] = v.split(':');
        accum[key] = value;
        return accum;
    },{})
    return final;
}

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
    const passport = parseRow(row)
    const required = Object.keys(requiredFields);
    const filtered = required.filter(v => {
        const validateFn = requiredFields[v];
        if(passport[v]) {
            return !validateFn(passport[v])
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
