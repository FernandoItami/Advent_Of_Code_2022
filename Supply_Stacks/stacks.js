const {readFileSync } = require('fs');
const { performance } = require('perf_hooks');

var startTime = performance.now()
function syncReadFile(filename) {
  let crates = [
    ['Z', 'T', 'F', 'R', 'W', 'J', 'G'],
    ['G', 'W', 'M'],
    ['J', 'N', 'H', 'G'],
    ['J', 'R', 'C', 'N', 'W'],
    ['W', 'F', 'S', 'B', 'G', 'Q', 'V', 'M'],
    ['S', 'R', 'T', 'D', 'V', 'W', 'C'],
    ['H','B','N','C','D','Z','G','V'],
    ['S','J','N','M','G','C'],
    ['G','P','N','W','C','J','D','L']
  ]
  
  const data = readFileSync(filename, 'utf-8');
  const arr = data.split(/\n\n/);
  let instructions = arr[1].split(/\n/)
  let cleanInstructions = []
  instructions = instructions.map(value => value.replace(/move | from | to /gi, ',').slice(1))

  instructions.map((value) => {
    cleanInstructions.push(value.split(','))
  })

  cleanInstructions = cleanInstructions.map(item => item.map(value => Number(value)))

  // step 1

  for (let index = 0; index < cleanInstructions.length; index++) {
    let steps = 0
    while (steps < cleanInstructions[index][0]) {
      let removed = crates[cleanInstructions[index][1] -1].pop()
      crates[cleanInstructions[index][2] -1].push(removed)
      steps ++
    }
  }


  // step 2
  for (let index = 0; index < cleanInstructions.length; index++) {
    let steps = 0
    let reversed = []
    while (steps < cleanInstructions[index][0]) {
      let removed = crates[cleanInstructions[index][1] -1].pop()
      reversed.push(removed)
      steps ++
    }
    reversed = reversed.reverse()
    reversed.map((item) => {
      crates[cleanInstructions[index][2] -1].push(item)
    })
    
  }
  
  let topItems = ''
  crates.map((items) => {
    topItems += items[items.length -1]
  })

  console.log(topItems)

  return arr;
}
var endTime = performance.now()

console.log(`${endTime - startTime} milliseconds`)

syncReadFile('./stacks.txt');