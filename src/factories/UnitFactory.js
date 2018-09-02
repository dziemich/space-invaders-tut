import Phaser from 'phaser-ce/build/custom/phaser-split'
import Drag from '../utilities/Drag'

export default (width, height) => {
  const constructUnit = (spriteConfig, xArrayPos, yArrayPos, color) => {
    let unit = new Phaser.Sprite(spriteConfig.game, spriteConfig.x,
      spriteConfig.y, spriteConfig.asset)
    unit.anchor.setTo(0.5)
    unit.inputEnabled = true
    unit.input.enableDrag()

    unit.neighbors = {
      up: null,
      down: null,
      left: null,
      right: null
    }

    unit.arrayCoords = {
      x: xArrayPos,
      y: yArrayPos
    }
    unit.color = color
    unit.detected = false

    const drag = Drag(spriteConfig.game, unit)

    // events
    unit.events.onDragStart.add(drag.dragStart)
    unit.events.onDragUpdate.add(drag.dragUpdate)
    unit.events.onDragStop.add(drag.dragStop)

    return unit
  }

  const findNeighbors = (unitArray) => {
    unitArray.forEach(unit => {
      let x = unit.arrayCoords.x
      let y = unit.arrayCoords.y
      if (y > 0) {
        unit.neighbors.up = unitArray[(y - 1) * width + x]
      }
      if (y < height - 1) {
        unit.neighbors.down = unitArray[(y + 1) * width + x]
      }
      if (x > 0) {
        unit.neighbors.left = unitArray[y * width + x - 1]
      }
      if (x < width - 1) {
        unit.neighbors.right = unitArray[y * width + x + 1]
      }
      // console.log(x + ' ' + y)
      // console.log(unit.neighbors)
    })
  }
  //
  //   const update = () => {}
  //
  return {
    constructUnit,
    findNeighbors
  }
}
