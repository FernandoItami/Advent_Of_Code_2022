const { readFileSync } = require('fs');
const { performance } = require('perf_hooks');

var startTime = performance.now()
function syncReadFile(filename) {

  const data = readFileSync(filename, 'utf-8');
  const arr = data.split(/\n/);

  let instructions = []

  arr.map((item) => {
    let temp;
    if (item.startsWith('a')) {
      temp = item.split(' ')
      temp = [temp[0], Number(temp[1])]
      instructions.push(temp[0])
      instructions.push(temp[1])
    } else { instructions.push(item) }
  })


  // part 1

  // let x = 1
  // let signals = []

  // for (let index = 0; index < instructions.length; index++) {
  //   if (index + 1 === 20) {
  //     signals.push(x * (index + 1))
  //   }
  //   if (index + 1 > 20 && ((index + 1) - 20) % 40 === 0) {
  //     signals.push(x * (index + 1))
  //   }
  //   if (!isNaN(instructions[index])) {
  //     x += instructions[index]
  //   }
  //   console.log(index +1)
  // }

  // const sum = signals.reduce((sum, current) => sum + current);

  // part 2

  let x = 1
  let lines = []
  let crt = []

  for (let index = 0; index < instructions.length; index += 40) {
    lines.push(instructions.slice(index, index + 40))    
  }

  lines.map((entry) => {
    let line = ''
    for (let i = 0; i < entry.length; i++) {
      if (i === x -1 || i === x || i === x + 1) {
        line += '#'
      } else line += '.'
      if (!isNaN(entry[i])) {
      x += entry[i]
    }
    }
    crt.push(line)
  })

  console.log(crt)

  return arr;
}
var endTime = performance.now()

console.log(`${endTime - startTime} milliseconds`)

syncReadFile('./input.txt');