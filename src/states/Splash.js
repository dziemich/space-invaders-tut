import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')

    this.loaderBg.anchor.setTo(0.5)
    this.loaderBar.anchor.setTo(0.5)

    this.load.setPreloadSprite(this.loaderBar)

    this.load.image('red', 'assets/images/game_sprites/red.png')
    this.load.image('blue', 'assets/images/game_sprites/blue.png')
    this.load.image('yellow', 'assets/images/game_sprites/yellow.png')
    this.load.image('green', 'assets/images/game_sprites/green.png')
    this.load.image('bg', 'assets/images/game_sprites/bg.png')
  }

  create () {
    this.state.start('Game')
  }
}
