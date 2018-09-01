import Phaser from 'phaser'
import Unit from '../sprites/Unit'

export default class extends Phaser.State {
  init () {
    this.shoot = this.shoot.bind(this)
  }
  preload () { }

  create () {
    const bg = this.game.add.sprite(25, 0.45 * this.world.centerY, 'bg')

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 11; j++) {
        const unit = new Unit({
          game: this.game,
          x: 50 + i * 41,
          y: 0.45 * this.world.centerY + 22 + j * 41,
          asset: 'blue'
        }, 0.2)
        this.game.add.existing(unit)
      }
    }
  }

  shoot () {

  }

  render () {
  }
}
