const { readFileSync } = require('fs');
const { performance } = require('perf_hooks');
const { json } = require('stream/consumers');

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

  let headX = 0
  let headY = 0
  let headMoves = [{ x: 0, y: 0 }]
  let tailMoves = [{ x: 0, y: 0 }]
  let knotOne = [{ x: 0, y: 0 }]
  let knotTwo = [{ x: 0, y: 0 }]
  let knotThree = [{ x: 0, y: 0 }]
  let knotFour = [{ x: 0, y: 0 }]
  let knotFive = [{ x: 0, y: 0 }]
  let knotSix = [{ x: 0, y: 0 }]
  let knotSeven = [{ x: 0, y: 0 }]
  let knotEight = [{ x: 0, y: 0 }]


  moves.map((move) => {
    switch (true) {
      case move[0] == 'U':
        for (let index = 0; index < move[1]; index++) {
          headY += 1
          headMoves.push({ x: headX, y: headY })

        }
        break;
      case move[0] == 'D':
        for (let index = 0; index < move[1]; index++) {
          headY -= 1
          headMoves.push({ x: headX, y: headY })
        }
        break;
      case move[0] == 'R':
        for (let index = 0; index < move[1]; index++) {
          headX += 1
          headMoves.push({ x: headX, y: headY })
        }
        break;
      case move[0] == 'L':
        for (let index = 0; index < move[1]; index++) {
          headX -= 1
          headMoves.push({ x: headX, y: headY })
        }
        break;
      default:
        break;
    }
  })

  for (let index = 0; index < headMoves.length; index++) {
    if ((headMoves[index].x - tailMoves[tailMoves.length - 1].x > 1) || (headMoves[index].y - tailMoves[tailMoves.length - 1].y > 1)) {
      tailMoves.push(headMoves[index - 1])
    } else if ((headMoves[index].x - tailMoves[tailMoves.length - 1].x < -1) || (headMoves[index].y - tailMoves[tailMoves.length - 1].y < -1)) {
      tailMoves.push(headMoves[index - 1])
    }
  }

  // tailMoves = tailMoves.map(item => JSON.stringify(item))
  // uniquePositions = new Set([...tailMoves])
  // console.log(uniquePositions.size)

  let knots = [tailMoves, knotOne, knotTwo, knotThree, knotFour, knotFive, knotSix, knotSeven, knotEight]

  for (let index = 0; index < knots.length - 1; index++) {
    for (let move = 0; move < knots[index].length; move++) {
      let xGap = Math.abs(knots[index][move].x - knots[index + 1][knots[index + 1].length - 1].x)
      let yGap = Math.abs(knots[index][move].y - knots[index + 1][knots[index + 1].length - 1].y)
      let tailX = knots[index + 1][knots[index + 1].length - 1].x
      let tailY = knots[index + 1][knots[index + 1].length - 1].y
      let headX = knots[index][move].x
      let headY = knots[index][move].y

      if (xGap === 2 || yGap === 2) {
        tailX = tailX === headX ? tailX : headX > tailX ? tailX + 1 : tailX - 1;
        tailY = tailY === headY ? tailY : headY > tailY ? tailY + 1 : tailY - 1;
      }
      knots[index + 1].push({ x: tailX, y: tailY })
    }
  }

  knots[8] = knots[8].map(item => JSON.stringify(item))
  let uniqueEight = new Set([...knots[8]])
  console.log(uniqueEight.size)

  return arr;
}
var endTime = performance.now()

console.log(`${endTime - startTime} milliseconds`)

syncReadFile('./motions.txt');