
export default (unit, directions) => {
  console.log('detect called')
  let returnArr = []
  if (directions.up && directions.down) {
    if (directions.up.color === unit.color && directions.down.color === unit.color) {
      console.log('updown called')
      let unitsUp = [directions.up]
      let unitsDown = [directions.down]
      returnArr = unitsInLine(unitsUp, 'up').concat(unitsInLine(unitsDown, 'down'))
      // console.log(returnArr)
    }
  }
  if (directions.left && directions.right) {
    if (directions.left.color === unit.color && directions.right.color === unit.color) {
      console.log('leftright called')
      let unitsLeft = [directions.left]
      let unitsRight = [directions.right]
      returnArr = unitsInLine(unitsLeft, 'left').concat(unitsInLine(unitsRight, 'right'))
      console.log(returnArr)
    }
  }
  Object.entries(directions).forEach(neighbor => {
    if (unit.color === neighbor[1].color) {
      let units = [neighbor[1]]
      returnArr = unitsInLine(units, neighbor[0])
    }
  })
  return returnArr
}
const unitsInLine = (units, direction) => {
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
  return unitsInLine(units, direction)
}
