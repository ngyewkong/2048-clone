// treating grid, cell, tile as individual classes/components

// setting css variables in js we need access to the grid size 
// in order to determine what cell is in what grid 
const GRID_SIZE = 4
const CELL_SIZE = 20
const CELL_GAP = 2

export default class Grid {
    constructor(gridElement) {
        // setProperty with string interpolation to convert to vmin values
        gridElement.style.setProperty("--grid-size", GRID_SIZE)
        gridElement.style.setProperty("--cell-size", `${CELL_SIZE}vmin`)
        gridElement.style.setProperty("--cell-gap", `${CELL_GAP}vmin`)

        // create cells according to grid_size
        createCellElements(gridElement)
    }
}

function createCellElements(gridElement) {
    // create cells using arrays
    const cells = []
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        const cell = document.createElement("div")
        // cell div will have class cell
        cell.classList.add("cell")
        // push the individual cell element to the cells array
        cells.push(cell)
        // append cell to the grid element (page)
        gridElement.append(cell)
    }
    return cells
}