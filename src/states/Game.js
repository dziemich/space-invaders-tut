import Phaser from 'phaser'

export default class extends Phaser.State {
  init () { }
  preload () { }

  create () {
    let banner = this.add.text(this.world.centerX, this.game.height - 80, 'Welcome!', {
      font: '40px Lobster',
      fill: '#cecece',
      smoothed: true
    })

    banner.padding.set(10, 16)
    banner.anchor.setTo(0.5)
  }

  render () {
  }
}
