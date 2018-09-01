import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {}

  preload () {
    let banner = this.add.text(this.world.centerX, this.game.height - 200, 'Jewelz', {
      font: '40px Lobster',
      fill: '#cecece',
      smoothed: true
    })
    banner.padding.set(10, 16)
    banner.anchor.setTo(0.5)
  }
  create () {
    this.state.start('Game')
  }
}
