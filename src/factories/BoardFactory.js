import UnitFactory from './UnitFactory'

export default (game, width, height) => {
  const unitFactory = UnitFactory(width, height)
  const createUnitBoard = () => {
    let units = []
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const color = assetType()
        const unit = unitFactory.constructUnit({
          game: game,
          x: 65 + j * 42,
          y: 190 + i * 41,
          asset: color
        }, j, i, color)
        units.push(unit)
      }
    }
    return units
  }

  const printBoard = (array) => {
    // console.log(array)
    array.forEach(element => {
      game.add.existing(element)
    })
  }

  const assetType = () => {
    switch (Math.floor(Math.random() * 4) + 1) {
      case 1:
        return 'blue'
      case 2:
        return 'red'
      case 3:
        return 'yellow'
      case 4:
        return 'green'
    }
  }

  return {
    createUnitBoard,
    printBoard

  }
}
