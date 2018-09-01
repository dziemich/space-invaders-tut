import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({
    game,
    x,
    y,
    asset
  }) {
    super(game, x, y, asset)
    // this.anchor.setTo(0.5)
    this.inputEnabled = true
    this.input.enableDrag()
    // this.input.setDragLock(true, false)
    this.initCursorPositionX = null
    this.initCursorPositionY = null
    this.lockedAxis = false

    let slideBoundary = 100
    let bounds = new Phaser.Rectangle(this.x - slideBoundary / 4, this.y - slideBoundary / 4, slideBoundary, slideBoundary)

    this.input.boundsRect = bounds
    this.events.onDragUpdate.add(this.dragUpdate.bind(this))
    this.events.onDragStop.add(this.dragStop.bind(this))
  }

  dragUpdate () {
    if (this.lockedAxis) {
      return false
    }

    // if we don't have a record of the initial cursor's position when it started dragging, grab one and exit
    if (this.initCursorPositionX === null || this.initCursorPositionY === null) {
      this.initCursorPositionX = this.game.input.x
      this.initCursorPositionY = this.game.input.y
      return false
    }

    // calculate the absolute difference between the initial cursor position and the current one for both axis
    let differenceX = Math.abs(this.initCursorPositionX - this.game.input.x)
    let differenceY = Math.abs(this.initCursorPositionY - this.game.input.y)

    // allow at least one of the axis to move 5 pixels before restricting movement to either
    if (differenceX < 5 && differenceY < 5) {
      return false
    }
    console.log(this.x)
    // if the cursor moved a greater distance in X-axis than in Y-axis, then restrict dragging horizontally
    if (differenceX > differenceY) {
      this.input.setDragLock(true, false)
      this.lockedAxis = true
      return false
    }

    // alternatively, restrict dragging vertically
    this.input.setDragLock(false, true)
    this.lockedAxis = true
    
  }

  dragStop () {
    this.initCursorPositionX = null
    this.initCursorPositionY = null
    this.lockedAxis = false
  }
  update () {}
}
