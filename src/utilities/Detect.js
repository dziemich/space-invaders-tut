/**
 * @param unit
 * @param lines
 * {
 *   up: 1,
 *   down: 1,
 *   left: 1,
 *   right: 1
 * }
 */

const detectChange = (unit) => {
  let up = unit.neighbors.up
  let down = unit.neighbors.down
  let left = unit.neighbors.left
  let right = unit.neighbors.right
  // console.log('up')
  // console.log(up)
  // console.log('down')
  // console.log(down)
  // console.log('left')
  // console.log(left)
  // console.log('right')
  // console.log(right)
  if (up !== null && down !== null) {
    if (up.color === unit.color && down.color === unit.color) {
      return countBricksInLine(up, 'up', 1) + countBricksInLine(dow, 'down', 1) + 1
    }
  }
  if (left !== null && right !== null) {
    if (left.color === unit.color && right.color === unit.color) {
      return countBricksInLine(left, 'left', 1) + countBricksInLine(right,
        'right', 1) + 1
    }
  }
  if (up !== null && up.color === unit.color) {
    return countBricksInLine(up, 'up', 1)
  }
  if (down !== null && down.color === unit.color) {
    return countBricksInLine(down, 'down', 1)
  }
  if (left !== null && left.color === unit.color) {
    return countBricksInLine(left, 'left', 1)
  }
  if (right !== null && right.color === unit.color) {
    return countBricksInLine(right, 'right', 1)
  }
  return 0
}
const countBricksInLine = (unit, direction, count) => {
  let neighborChecked = null
  switch (direction) {
    case 'up':
      if (unit.neighbors.up) {
        neighborChecked = unit.neighbors.up
      }
      break
    case 'down':
      if (unit.neighbors.down) {
        neighborChecked = unit.neighbors.down
      }
      break
    case 'left':
      if (unit.neighbors.left) {
        neighborChecked = unit.neighbors.left
      }
      break
    case 'right':
      if (unit.neighbors.right) {
        neighborChecked = unit.neighbors.right
      }
      break
  }
  if (neighborChecked === null || neighborChecked.color !== unit.color) {
    return count
  }
  return countBricksInLine(neighborChecked, direction, ++count)
}

export default (unit) => {
  console.log('called')
  let unitsInLine = detectChange(unit)
  if (unitsInLine >= 3) {
    console.log('shift happening ' + unitsInLine)
  } else {
    console.log('not enough' + unitsInLine)
  }
}
