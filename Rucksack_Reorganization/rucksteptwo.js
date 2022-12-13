const {readFileSync } = require('fs');
const { performance } = require('perf_hooks');

const items = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

var startTime = performance.now()
function syncReadFile(filename) {
  
  const data = readFileSync(filename, 'utf-8');

  const arr = data.split(/\n/);

  let elves = []
  let groups = []
  let priorities = 0

  arr.map((elf) => {
    elves.push(elf.split(''))
  })

  console.log(elves.length)
  
  while (elves.length >= 3) {
    groups.push(elves.splice(0,3))
  }
  console.log(groups.length)

  for (let index = 0; index < groups.length; index++) {
    groups[index][0].every((element) => {
        if (groups[index][1].includes(element) && groups[index][2].includes(element)) {
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