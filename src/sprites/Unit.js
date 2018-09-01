import Phaser from 'phaser-ce/build/custom/phaser-split'

export default class extends Phaser.Sprite {
  constructor ({
    game,
    x,
    y,
    asset
  }, xArrayPos, yArrayPos) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    this.inputEnabled = true
    this.input.enableDrag()
    // this.input.setDragLock(true, false)



    this.neighbors = []
    this.xArrayPos = xArrayPos
    this.yArrayPos = yArrayPos


    let slideBoundary = 115
    this.input.boundsRect = new Phaser.Rectangle(this.x - slideBoundary / 2,
      this.y - slideBoundary / 2, slideBoundary, slideBoundary)

    // bindings
    this.dragStart = this.dragStart.bind(this)
    this.dragUpdate = this.dragUpdate.bind(this)
    this.dragStop = this.dragStop.bind(this)

    // events
    this.events.onDragStart.add(this.dragStart)
    this.events.onDragUpdate.add(this.dragUpdate)
    this.events.onDragStop.add(this.dragStop)
  }


  findNeighbors () {

  }
  update () {}
}
