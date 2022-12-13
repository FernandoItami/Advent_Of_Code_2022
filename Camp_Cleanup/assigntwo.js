const {readFileSync } = require('fs');
const { performance } = require('perf_hooks');

var startTime = performance.now()
function syncReadFile(filename) {
  const data = readFileSync(filename, 'utf-8');
  const arr = data.split(/\n/);
  let pairs = []
  let overlaps = 0
  arr.map((entry) => {
    let splitted = []
    let temp = entry.split(',')
    temp.map((elves) => {
        splitted.push(elves.split('-'))
    })
    pairs.push(splitted)
  })

  pairs = pairs.map(arr => arr.map(item => item.map(value => Number(value))))
  pairs.map((pair) => {
    if (pair[0][0] >= pair[1][0] && pair[0][1] <= pair[1][1]) {
        overlaps += 1
      } else if (pair[1][0] >= pair[0][0] && pair[1][1] <= pair[0][1]) {
        overlaps += 1
      } else if (pair[0][0] >= pair[1][0] && pair[0][0] <= pair[1][1]) {
        overlaps += 1
      } else if (pair[0][1] >= pair[1][0] && pair[0][1] <= pair[1][1]) {
        overlaps += 1
      } else if (pair[1][0] >= pair[0][0] && pair[1][0] <= pair[0][1]) {
        overlaps += 1
      } else if (pair[1][1] >= pair[0][0] && pair[1][1] <= pair[0][1]) {
        overlaps += 1
      } 
  })

  

  console.log(overlaps)

  return arr;
}
var endTime = performance.now()

console.log(`${endTime - startTime} milliseconds`)

syncReadFile('./assign.txt');