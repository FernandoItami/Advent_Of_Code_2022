const {readFileSync } = require('fs');
const { performance } = require('perf_hooks');

var startTime = performance.now()
function syncReadFile(filename) {
  const data = readFileSync(filename, 'utf-8');
  const arr = data.split(/\n/).map((line) => (line.split('')));
  const grid = arr.map(item => item.map(value => Number(value)))

  let innerTrees = []
  for (let x = 1; x < grid.length - 1; x++) {
    for (let y = 1; y < grid[x].length -1; y++) {
      innerTrees.push({
        h: grid[x][y],
        x: x,
        y: y
      })
    }
  }

  let innerVisible = 0
  let scores = []
  innerTrees.map((tree) => {
    const x = tree.x
    const y = tree.y
    let west = grid[x].slice(0,y)
    west = west.reverse()
    let east = grid[x].slice(y + 1)
    let north = grid.map((row) => row[y]).slice(0,x)
    north = north.reverse()
    let south = grid.map((row) => row[y]).slice(x + 1)

    //part 1
    // if (west.every(elem => elem < tree.h) || east.every(elem => elem < tree.h) || north.every(elem => elem < tree.h) || south.every(elem => elem < tree.h)) {
    //   innerVisible += 1
    // }
    

    //part 2
    function checkScore(arr) {
      let score = 0
      for (let index = 0; index < arr.length; index++) {
        if (arr[index] < tree.h) {
          score += 1
        } else {
          score += 1
          break;
        };
      }
      return score;
    }
    
    let wscore = checkScore(west)
    let escore = checkScore(east)
    let nscore = checkScore(north)
    let sscore = checkScore(south)
    scores.push(nscore * wscore * sscore * escore)

  })
  let uniqueScores = [...new Set(scores)]
  console.log(Math.max(...uniqueScores))

  // console.log(innerVisible + (grid.length * 2) + grid[0].slice(1,grid[0].length -1).length * 2)

  return arr;
}
var endTime = performance.now()

console.log(`${endTime - startTime} milliseconds`)

syncReadFile('./treehouse.txt');