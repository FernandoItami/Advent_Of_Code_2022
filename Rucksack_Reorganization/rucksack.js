const {readFileSync } = require('fs');
const { performance } = require('perf_hooks');

const items = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

var startTime = performance.now()
function syncReadFile(filename) {
  
  const data = readFileSync(filename, 'utf-8');

  const arr = data.split(/\n/);

  let splitted = []
  let priorities = 0

  arr.map((string) => {
    let left = string.slice(0, string.length / 2)
    let right = string.slice(string.length / 2, string.length)
    splitted.push([left.split(''), right.split('')])
  })
  
  for (let index = 0; index < splitted.length; index++) {
    splitted[index][0].every((element) => {
        if (splitted[index][1].includes(element)) {
            // console.log(`${element}: ${items.indexOf(element) + 1}`)
            priorities += items.indexOf(element) + 1
            return false
        }
        return true
    });
  }

  console.log(priorities)

  return arr;
}
var endTime = performance.now()

console.log(`${endTime - startTime} milliseconds`)

syncReadFile('./rucksack.txt');