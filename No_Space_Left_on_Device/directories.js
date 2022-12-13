const { readFileSync } = require('fs');
const util = require('util')
const { performance } = require('perf_hooks');

var startTime = performance.now()
function syncReadFile(filename) {

  const data = readFileSync(filename, 'utf-8');
  const arr = data.split(/\n/)
  let fileSystem = {
    name: '/',
    type: 'dir',
    children: []
  }
  let inputs = []

  arr.map((entry) => {
    if (entry != '$ cd /')
      inputs.push(entry)
  })
  const originalDir = 'fileSystem'
  let currentDir = fileSystem
  let currentCommand = null

  inputs.map((input) => {
    let entry = input.split(' ')
    if (entry[0] === '$') {
      switch (true) {
        case entry[1] === 'ls':
          currentCommand = 'ls'
          break;
        case entry[1] == 'cd':
          if (entry[2] != '..') {
            currentDir = currentDir.children.find((node) => node.type === 'dir' && node.name === entry[2])
          } else {
            currentDir = currentDir.parent
          }
          break;
        default:
          break;
      }
    } else if (entry[0] == 'dir') {
      currentDir.children.push({ type: 'dir', name: entry[1], children: [], parent: currentDir })
    } else {
      currentDir.children.push({ type: 'file', name: entry[1], size: Number(entry[0]), parent: currentDir })
    }
  })

  function getSize(node, directoryCallback = () => { }) {
    if (node.type == 'file') {
      return node.size;
    }
    const directorySize = node.children
      .map((child) => getSize(child, directoryCallback))
      .reduce((a, b) => a + b, 0);

    directoryCallback(node.name, directorySize);

    return directorySize;
  }


  let sumSmallFolder = 0;

  getSize(fileSystem, (name, size) => {
    if (size < 100000) {
      sumSmallFolder += size;
    }
  });

  console.log(sumSmallFolder);

  return;
}
var endTime = performance.now()

console.log(`${endTime - startTime} milliseconds`)

syncReadFile('./directories.txt');