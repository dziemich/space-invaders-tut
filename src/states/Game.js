import Phaser from 'phaser'
import boardUtilities from '../utilities/Board'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    const bg = this.game.add.sprite(25, 0.45 * this.world.centerY, 'bg')

    const board = boardUtilities(this.game)
    this.unitBoard = board.createUnitBoard()
    board.printBoard(this.unitBoard)
  }

  render () {}
}
