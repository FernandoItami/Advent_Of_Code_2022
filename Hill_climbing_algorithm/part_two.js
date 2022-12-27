const { readFileSync } = require("fs");
const { performance } = require("perf_hooks");

var startTime = performance.now();
function syncReadFile(filename) {
  const data = readFileSync(filename, "utf-8");

  const arr = data.split(/\n/);

  let terrain = [];
  arr.map((element) => {
    terrain.push(element.replace("\r", "").split(""));
  });

  let er,ec;
  terrain.map((row, y) => {
    row.map((col, x) => {
      if (col === "S") {
        terrain[y][x] = 0;
      } else if (col === "E") {
        er = y;
        ec = x;
        terrain[y][x] = 25;
      } else {
        terrain[y][x] = col.charCodeAt(0) - 'a'.charCodeAt(0)
      }
      
    });
  });

  let queue = []
  queue.push([0, er, ec])
  let visited = []
  visited.push(`${er}:${ec}`)

  while (queue.length) {
    const [d,r,c] = queue.shift()
    const next = [[r+1,c], [r-1,c],[r,c+1],[r,c-1]]
    for (let i = 0; i < next.length; i++) {
      const nr = next[i][0]
      const nc = next[i][1]

      if (nr < 0 || nc < 0 || nr >= terrain.length || nc >= terrain[0].length) 
        continue
      if (visited.find(x => x === `${nr}:${nc}`)) 
        continue
      if (terrain[nr][nc] - terrain[r][c] < -1)
        continue
      if (terrain[nr][nc] === 0) {
        console.log(d + 1)
        return;
      }
      visited.push(`${nr}:${nc}`)
      queue.push([d + 1, nr, nc])
    }
  }

  return arr;
}
var endTime = performance.now();

console.log(`${endTime - startTime} milliseconds`);

syncReadFile("./input.txt");
