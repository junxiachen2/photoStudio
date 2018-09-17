// cell-group.js
Component({
  relations: {
    '../cell/cell': {
      type: 'child',
      linked (target) {
      }
    }
  },
  ready () {
    const cells = this.getRelationNodes('../cell/cell')
    const len = cells.length

    if (len > 0) {
      const lastCell = cells[len - 1]
      lastCell.setItLastCell()
    }
  }
})
