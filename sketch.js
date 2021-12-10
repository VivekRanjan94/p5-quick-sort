let arr = []
const timePerSwap = 5
const WHITE = '#FFF'
const RED = '#E0777D'
const GREEN = '#D6FFB7'
let colors = []

function setup() {
  createCanvas(windowWidth - 1, windowHeight - 1)

  arr = new Array(width)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = random(height)
    colors[i] = WHITE
  }

  quickSort(arr, 0, arr.length)
}

async function partition(arr, start, end) {
  for (let i = start; i < end; i++) {
    colors[i] = GREEN
  }

  const pivotValue = arr[end]
  let pivotIndex = start

  colors[pivotIndex] = RED
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex)
      colors[pivotIndex] = WHITE
      pivotIndex++
      colors[pivotIndex] = RED
    }
  }

  // Putting the pivot value in the middle
  await swap(arr, pivotIndex, end)

  for (let i = start; i < end; i++) {
    if (i != pivotIndex) {
      colors[i] = WHITE
    }
  }

  return pivotIndex
}

async function quickSort(arr, start, end) {
  // Base case or terminating case
  if (start >= end) {
    return
  }

  let index = await partition(arr, start, end)
  colors[index] = WHITE

  await Promise.all([
    await quickSort(arr, start, index - 1),
    await quickSort(arr, index + 1, end),
  ])
}

function draw() {
  background(0)

  for (let i = 0; i < arr.length; i++) {
    // stroke(255)
    stroke(color(colors[i] || 255))
    line(i, height, i, height - arr[i])
  }
}

async function swap(arr, i, j) {
  await sleep(timePerSwap)
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}
