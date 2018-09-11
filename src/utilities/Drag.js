import Phaser from 'phaser'
import detect from '../utilities/Detect'

export default (game, unit) => {
  let initCursorPositionX = null
  let initCursorPositionY = null
  let lockedAxis = false
  let noChangeHappened = true
  let initialX = unit.x
  let initialY = unit.y

  let slideBoundary = 115
  unit.input.boundsRect = new Phaser.Rectangle(unit.x - slideBoundary / 2,
    unit.y - slideBoundary / 2, slideBoundary, slideBoundary)

  const checkOverlap = (spriteA, spriteB) => {
    var boundsA = spriteA.getBounds()
    var boundsB = spriteB.getBounds()

    return Phaser.Rectangle.intersects(boundsA, boundsB)
  }
  const dragStart = () => {
    unit.scale.setTo(1.2)
  }

  const dragUpdate = () => {
    if (lockedAxis) {
      return false
    }

    if (initCursorPositionX === null || initCursorPositionY === null) {
      initCursorPositionX = game.input.x
      initCursorPositionY = game.input.y
      return false
    }

    let differenceX = Math.abs(initCursorPositionX - game.input.x)
    let differenceY = Math.abs(initCursorPositionY - game.input.y)

    if (differenceX < 5 && differenceY < 5) {
      return false
    }

    if (differenceX > differenceY) {
      unit.input.setDragLock(true, false)
      lockedAxis = true
      return false
    }

    unit.input.setDragLock(false, true)
    lockedAxis = true
  }

  const dragStop = () => {
    Object.entries(unit.neighbors).forEach(direction => {
      if (direction[1] !== null) {
        if (checkOverlap(unit, direction[1])) {
          let validDirectionsForUnit = removeSelfForChecking(direction)
          let unitsToBeDestroyedU = detect(unit, validDirectionsForUnit)
          console.log(unitsToBeDestroyedU)
          console.log(unitsToBeDestroyedU.length)
          if (unitsToBeDestroyedU.length >= 2) {
            console.log('aaa')
            unit.kill()

            unitsToBeDestroyedU.forEach(unit => unit.kill())
          }
        }
      }
    })
    // TODO when the change happens the dragging is flawed -> clicking on the changed
    initCursorPositionX = null
    initCursorPositionY = null
    lockedAxis = false
    unit.scale.setTo(1)
    if (noChangeHappened) {
      unit.x = initialX
      unit.y = initialY
    }
  }
  // TODO figure a cleaner way for this function
  const removeSelfForChecking = direction => {
    let valid = {}
    if (direction[0] === 'up') {
      if (direction[1].neighbors.up) valid.up = direction[1].neighbors.up
      if (direction[1].neighbors.left) valid.left = direction[1].neighbors.left
      if (direction[1].neighbors.right) valid.right = direction[1].neighbors.right
    }
    if (direction[0] === 'down') {
      if (direction[1].neighbors.down) valid.down = direction[1].neighbors.down
      if (direction[1].neighbors.left) valid.left = direction[1].neighbors.left
      if (direction[1].neighbors.right) valid.right = direction[1].neighbors.right
    }
    if (direction[0] === 'left') {
      if (direction[1].neighbors.up) valid.up = direction[1].neighbors.up
      if (direction[1].neighbors.down) valid.down = direction[1].neighbors.down
      if (direction[1].neighbors.left) valid.left = direction[1].neighbors.left
    }
    if (direction[0] === 'right') {
      if (direction[1].neighbors.up) valid.up = direction[1].neighbors.up
      if (direction[1].neighbors.down) valid.down = direction[1].neighbors.down
      if (direction[1].neighbors.right) valid.right = direction[1].neighbors.right
    }
    return valid
  }

  return {
    dragStart,
    dragUpdate,
    dragStop
  }
}
// const newUnit = factory.constructUnit(
//               {game: game, x: unit.x, y: unit.y, asset: unit.color},
//               unit.arrayCoords.x, unit.arrayCoords.y, unit.color)
//             const newDirection = factory.constructUnit(
//               {game: game, x: unit.x, y: unit.y, asset: unit.color},
//               unit.arrayCoords.x, unit.arrayCoords.y, unit.color)
