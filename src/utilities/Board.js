import Unit from '../sprites/Unit'

export default (game) => {
  const createUnitBoard = () => {
    let units = []
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 11; j++) {
        const unit = new Unit({
          game: game,
          x: 65 + i * 42,
          y: 190 + j * 41,
          asset: assetType()
        })
        units.push(unit)
      }
    }
    return units
  }

  const printBoard = (array) => {
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
