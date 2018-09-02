import Phaser from 'phaser'
import boardUtilities from '../utilities/Board'
import UnitFactory from '../sprites/Unit'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    const bg = this.game.add.sprite(25, 0.45 * this.world.centerY, 'bg')

    const width = 7
    const height = 11
    const board = boardUtilities(this.game, width, height)
    const unitFactory = UnitFactory(width, height)
    this.unitArray = board.createUnitBoard(width, height)
    unitFactory.findNeighbors(this.unitArray)
    board.printBoard(this.unitArray)
  }

  render () {}
}
