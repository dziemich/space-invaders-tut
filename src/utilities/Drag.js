export default (game, unit) => {
  let initCursorPositionX = null
  let initCursorPositionY = null
  let lockedAxis = false
  let noChangeHappened = true
  let initialX = unit.x
  let initialY = unit.y

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
    initCursorPositionX = null
    initCursorPositionY = null
    lockedAxis = false
    unit.scale.setTo(1)
    if (noChangeHappened) {
      unit.x = initialX
      unit.y = initialY
    }
  }

  return {
    dragStart,
    dragUpdate,
    dragStop
  }
}
