import Phaser from 'phaser'
import BoardFactory from '../factories/BoardFactory'
import UnitFactory from '../factories/UnitFactory'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    const bg = this.game.add.sprite(25, 0.45 * this.world.centerY, 'bg')

    const width = 5
    const height = 5
    const board = BoardFactory(this.game, width, height)
    const unitFactory = UnitFactory(width, height)
    this.unitArray = board.createUnitBoard(width, height)
    unitFactory.findNeighbors(this.unitArray)
    board.printBoard(this.unitArray)
  }

  render () {}
}
