const {readFileSync } = require('fs');
const { performance } = require('perf_hooks');

var startTime = performance.now()
function syncReadFile(filename) {
  
  const data = readFileSync(filename, 'utf-8');

  const arr = data.split(/\n/);

  let rounds = []
  let parcialScore = []

  arr.map((round, index) => {
    rounds.push(round.split(' '))
  })

  rounds.map((item) => {
    switch (item[0]) {
        case 'A':
            if (item[1] == 'X') {
                parcialScore.push(0 + 3)
            } else if (item[1] == 'Y') {
                parcialScore.push(3 + 1)
            } else parcialScore.push(6 + 2)
            break;
        case 'B':
            if (item[1] == 'X') {
                parcialScore.push(0 + 1)
            } else if (item[1] == 'Y') {
                parcialScore.push(3 + 2)
            } else parcialScore.push(6 + 3)
            break;
        case 'C':
            if (item[1] == 'X') {
                parcialScore.push(0 + 2)
            } else if (item[1] == 'Y') {
                parcialScore.push(3 + 3)
            } else parcialScore.push(6 + 1)
            break;
        default:
            break;
    }
  })

  let totalScore = parcialScore.reduce((oldValue, currentValue) => oldValue + currentValue)

  console.log(totalScore)



  return arr;
}
var endTime = performance.now()

console.log(`${endTime - startTime} milliseconds`)

syncReadFile('./strategy.txt');

