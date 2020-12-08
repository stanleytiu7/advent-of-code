const { getRawInput } = require("../lib");

const unparsed = getRawInput();
const test = 'light red bags contain 1 bright white bag, 2 muted yellow bags.\ndark orange bags contain 3 bright white bags, 4 muted yellow bags.\nbright white bags contain 1 shiny gold bag.\nmuted yellow bags contain 2 shiny gold bags, 9 faded blue bags.\nshiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.\ndark olive bags contain 3 faded blue bags, 4 dotted black bags.\nvibrant plum bags contain 5 faded blue bags, 6 dotted black bags.\nfaded blue bags contain 5 my bags.\ndotted black bags contain 5 my bags.\n my bags contain no other bags.'

const other = 'shiny gold bags contain 2 dark red bags.\ndark red bags contain 2 dark orange bags.\ndark orange bags contain 2 dark yellow bags.\ndark yellow bags contain 2 dark green bags.\ndark green bags contain 2 dark blue bags.\ndark blue bags contain 2 dark violet bags.\ndark violet bags contain no other bags.'

const myData = parseData(test)
run();
function parseData(rawText) {
    // split by new line
    const rules = rawText.split("\n")

    // strip periods and split at commas, contain, and contains
    const split = rules.map(rule => rule.replace(/\./, "").split(/,|contain[s]?/))
    // trim extra white spaces
    const trimmed = split.map(rule => rule.map(entry => entry.trim()))
    // convert no other bags to null, and remove s
    const noS = trimmed.map(rule => rule.map(entry => {
        if (entry === "no other bags") return null;
        else if (entry[entry.length-1] === "s") return entry.slice(0, entry.length-1)
        else return entry
    }))
    return noS
}

function depToObj(dep) {
    if (dep){
        const split = dep.split(" ");
        const num = split.shift();
        const type = split.join(" ");
        return {
            value: +num,
            type
        }
    } else {
        return null
    }
}

function ruleToDep(rule) {
    const masterRule = rule.shift()
    const mapped = rule.filter(rule => !!rule).map(entry => depToObj(entry))
    return {
        type: masterRule,
        children: mapped
    }
}

function createDeps(data) {
    const tree = {};
    const objs = data.map(rule => ruleToDep(rule));
    return objs;
}

function run() {
    const deps = createDeps(myData);
    deps.forEach(dep => {dep.value = 1})
    getParentCount(deps);
    getContained(deps);
}

function getParentCount(deps) {
    let pointers = ["shiny gold bag"];
    const visited = new Set();
    while (pointers.length) {
        const pointer = pointers.shift()
        for (const dep of deps) {
            const found = dep.children.find(child => pointer === child.type)
            if (found) {
                visited.add(dep.type)
                pointers.push(dep.type)
            }        
        }
    }
    
    console.log(visited.size);
}

function getContained(deps) {
    const bag = deps.find(v => v.type === "shiny gold bag")
    bag.children.forEach(child => child.parentValue = 1);
    const pointers = [...bag.children];
    let sum = 0;
    while (pointers.length) {
        const pointer = pointers.pop() // you have to pop not shift... but why?
        sum += pointer.parentValue * pointer.value;
        console.log('sum: ', sum, pointer.path, pointer.pathName, 'curr:', pointer.type, pointer.value)
        const found = deps.find(v => v.type === pointer.type)
        if (found) {
            found.children.forEach(child => {
                if (!pointer.pathName) child.pathName = [pointer.type]
                else child.pathName = [...pointer.pathName, pointer.type]

                if (!pointer.path) child.path = [pointer.value]
                else child.path = [...pointer.path, pointer.value]

                child.parentValue = pointer.parentValue * pointer.value
            })
            pointers.push(...found.children)
        }        
    }
    console.log(sum)
}

function sumDeep(arr, val = 1) {
    let sum = 0;
    for (const v of arr) {
        if (v.children && v.children.length) {
            sum += (val) * sumDeep(v.children, v.value)
        } else {
            sum += val*v.value
        }
    }
    return sum;
}

