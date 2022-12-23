const {readFileSync } = require('fs');
const { performance } = require('perf_hooks');

var startTime = performance.now()
function syncReadFile(filename) {
  
  const data = readFileSync(filename, 'utf-8');

  const arr = data.split(/\n\n/);

  let monkeys = []

  arr.map((item) => {
    let temp = item.split(/\n/)
    temp = temp.map(item => item.trim())
    monkeys.push({
      monkey : parseInt(temp[0].replace(/Monkey| |:/g, '')),
      items: temp[1].replace(/Starting items:| /g, '').split(',').map(value => parseInt(value)),
      operation : temp[2].replace(/Operation: new = old /g, '').split(' ').map(value => (!isNaN(value)) ? parseInt(value) : value),
      test: {
        division: parseInt(temp[3].replace(/Test: divisible by /g, '')),
        isTrue : parseInt(temp[4].slice(-1)),
        isFalse : parseInt(temp[5].slice(-1))
      },
      inspected: 0
    })
  })

  let mod = 1
  monkeys.map((monkey) => {
    mod *= monkey.test.division
  })

  console.log(mod)

  for (let round = 0; round < 10000; round++) {
    for (let i = 0; i < monkeys.length; i++) {
      let operator = monkeys[i].operation[0]
      let operand = monkeys[i].operation[1]
      if ( monkeys[i].items.length > 0 ) {
        monkeys[i].items.map((item) => {
          monkeys[i].inspected += 1
          let newValue = 0
          switch (operator) {
            case '+':
              switch (true) {
                case typeof operand !== 'string':
                  newValue = item + operand
                  break;
                default:
                  newValue = item + item
                  break;
              }
              break;
            default:
              switch (true) {
                case typeof operand !== 'string':
                  newValue = item * operand
                  break;
                default:
                  newValue = item * item
                  break;
              }
              break;
          }
          newValue %= mod
          if ( newValue % monkeys[i].test.division === 0 ) {
            monkeys[monkeys[i].test.isTrue].items.push(newValue)
          } else monkeys[monkeys[i].test.isFalse].items.push(newValue)
        })
        monkeys[i].items = []
      }
    }
  }
  let inspectedValues = []
  monkeys.map((monkey) => {
    inspectedValues.push(monkey.inspected)
  })
  inspectedValues =  inspectedValues.sort((a,b) => b-a)
  
  console.log(inspectedValues[0] * inspectedValues[1])

  return arr;
}
var endTime = performance.now()

console.log(`${endTime - startTime} milliseconds`)

syncReadFile('./input.txt');

