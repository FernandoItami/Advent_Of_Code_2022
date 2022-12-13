const {readFileSync } = require('fs');
const { performance } = require('perf_hooks');

var startTime = performance.now()
function syncReadFile(filename) {
  
  const data = readFileSync(filename, 'utf-8');

  const arr = data.split(/\n\n/);

  let result = []

  arr.map((elf, index) => {
    result.push(0)
    elf.split(/\n/).map((cal) => {
      result[index] += parseInt(cal)
    })
  })
  console.log(Math.max(...result))

  let sortedList = result.sort(function(a,b){return b - a}).slice(0 ,3)

  const topSum = sortedList.reduce((topSum, current) => topSum + current);

  console.log(topSum)

  return arr;
}
var endTime = performance.now()

console.log(`${endTime - startTime} milliseconds`)

syncReadFile('./numbers.txt');