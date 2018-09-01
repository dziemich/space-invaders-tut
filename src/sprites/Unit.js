import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({
    game,
    x,
    y,
    asset
  }, scale) {
    super(game, x, y, asset)
    this.scale.setTo(scale)
    // this.anchor.setTo(0.5)
  }
  update () {}
}
