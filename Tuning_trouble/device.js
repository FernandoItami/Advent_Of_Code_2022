const { count } = require('console');
const {readFileSync } = require('fs');
const { performance } = require('perf_hooks');

var startTime = performance.now()
function syncReadFile(filename) {

  const data = readFileSync(filename, 'utf-8');
  
  const testInput = 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'

  let arr = data.split('')

  let markers = []
  let count = 13

  //first step

  // while (markers.length < 4) {
  //   let temp = [...new Set(arr.slice(0,4))]
  //   markers = temp
  //   arr.shift()
  //   count += 1
  // }

  //second step

  while (markers.length < 14) {
    let temp = [...new Set(arr.slice(0,14))]
    markers = temp
    arr.shift()
    count += 1
  }

  console.log(`Marker: ${markers} after ${count} characters.`)
  
  return;
}
var endTime = performance.now()

console.log(`${endTime - startTime} milliseconds`)

syncReadFile('./device.txt');