const {readFileSync } = require('fs');
const { performance } = require('perf_hooks');

var startTime = performance.now()
function syncReadFile(filename) {
  
  const data = readFileSync(filename, 'utf-8');

  const arr = data.split(/\n/);
  let moves = []
  arr.map((move) => {
    let temp;
    temp = move.replace('\r', '').split(' ')
    temp = [temp[0], parseInt(temp[1])]
    moves.push(temp)
  })
  console.log(moves)

  let x = 0 
  let y = 0

  moves.map((move) => {
    switch (true) {
      case move[0] == 'U':
        y += move[1]
        break;
      case move[0] == 'D':
        y -= move[1]
        break;
      case move[0] == 'R':
        x += move[1]
        break;
      case move[0] == 'L':
        x -= move[1]
        break;
      default:
        break;
    }
    console.log(x, y)
  })

  return arr;
}
var endTime = performance.now()

console.log(`${endTime - startTime} milliseconds`)

syncReadFile('./motionstest.txt');