
export default (color, directions) => {
  //console.log('detect called')
  if (directions.up && directions.down) {
    if (directions.up.color === color && directions.down.color === color) {
      let unitsUp = [directions.up]
      let unitsDown = [directions.down]
      let x = countUnitsInLine(unitsUp, 'up') + countUnitsInLine(unitsDown, 'down')
      console.log(x)
      return x
    }
  }
  if (directions.left && directions.right) {
    if (directions.left.color === color && directions.right.color === color) {
      let unitsLeft = [directions.left]
      let unitsRight = [directions.right]
      let x = countUnitsInLine(unitsLeft, 'left') + countUnitsInLine(unitsRight, 'right')
      console.log(x)
      return x
    }
  }
  Object.entries(directions).forEach(neighbor => {
    if (color === neighbor[1].color) {
      let units = [neighbor[1]]
      let x = countUnitsInLine(units, neighbor[0])
      console.log(x)
      return x
    }
  })
  return 0
}
const countUnitsInLine = (units, direction) => {
  let unit = units[units.length - 1]
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
    return units
  }
  units.push(neighborChecked)
  return countUnitsInLine(units, direction)
}

// if (unitsInLine >= 3) {
//   console.log('shift happening ' + unitsInLine)
// } else {
//   console.log('not enough' + unitsInLine)
// }

// if (up !== null && down !== null) {
//   if (up.color === unit.color && down.color === unit.color) {
//     //return countUnitsInLine(up, 'up', 1) + countUnitsInLine(down, 'down', 1) + 1
//     console.log('up and down of the same color')
//   }
// }
// if (left !== null && right !== null) {
//   if (left.color === unit.color && right.color === unit.color) {
//     //return countUnitsInLine(left, 'left', 1) + countUnitsInLine(right,
//       //'right', 1) + 1
//     console.log('left and right of the same color')
//
//   }
// }
// if (up && up.color === unit.color) {
//   // return countUnitsInLine(up, 'up', 1)
//   console.log('up of the same color')
//
// }
// if (down && down.color === unit.color) {
//   console.log('down of the same color')
//   // return countUnitsInLine(down, 'down', 1)
// }
// if (left && left.color === unit.color) {
//   console.log('left of the same color')
//   // return countUnitsInLine(left, 'left', 1)
// }
// if (right && right.color === unit.color) {
//   console.log('right of the same color')
//   // return countUnitsInLine(right, 'right', 1)
// }
// return 0
