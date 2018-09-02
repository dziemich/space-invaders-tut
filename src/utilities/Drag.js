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
          detect(unit)
          detect(direction[1])
        }
      }
    })
    initCursorPositionX = null
    initCursorPositionY = null
    lockedAxis = false
    unit.scale.setTo(1)
    if (noChangeHappened) {
      unit.x = initialX
      unit.y = initialY
    }
  }

  // const detect = (unit) => {
  //   Object.entries(unit.neighbors).forEach(direction => {
  //     if (unit.color === direction[1].color) {
  //       console.log('color matches')
  //     }
  //   })
  // }

  return {
    dragStart,
    dragUpdate,
    dragStop
  }
}
