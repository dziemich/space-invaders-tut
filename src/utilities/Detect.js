
export default (unit, directions) => {
  // console.log('detect called')
  let returnArr = []
  if (directions.up && directions.down) {
    if (directions.up.color === unit.color && directions.down.color === unit.color) {
      let unitsUp = [unit, directions.up]
      let unitsDown = [directions.down]
      returnArr = countUnitsInLine(unitsUp, 'up').concat(countUnitsInLine(unitsDown, 'down'))
    }
  }
  if (directions.left && directions.right) {
    if (directions.left.color === unit.color && directions.right.color === unit.color) {
      let unitsLeft = [unit, directions.left]
      let unitsRight = [directions.right]
      returnArr = countUnitsInLine(unitsLeft, 'left') + countUnitsInLine(unitsRight, 'right')
    }
  }
  Object.entries(directions).forEach(neighbor => {
    if (unit.color === neighbor[1].color) {
      let units = [unit, neighbor[1]]
      returnArr = countUnitsInLine(units, neighbor[0])
    }
  })
  return returnArr
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
