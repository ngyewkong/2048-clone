// treating grid, cell, tile as individual classes/components

// setting css variables in js we need access to the grid size 
// in order to determine what cell is in what grid 
const GRID_SIZE = 4
const CELL_SIZE = 20
const CELL_GAP = 2

export default class Grid {
    // setting private variables outside of constructor
    // setting private variables make it easier to work with
    // prevent accidental overwrite all the cells or call of the whole cells 
    // cell object is not directly accessible
    #cells

    constructor(gridElement) {
        // setProperty with string interpolation to convert to vmin values
        gridElement.style.setProperty("--grid-size", GRID_SIZE)
        gridElement.style.setProperty("--cell-size", `${CELL_SIZE}vmin`)
        gridElement.style.setProperty("--cell-gap", `${CELL_GAP}vmin`)

        // create cells according to grid_size
        // take in the index of the array to use to map x, y values 
        // x values can be taken via taking modulus of the index
        // y values can be taken via taking division of the index and flooring it to get an integer
        // # sign to declare private variables
        this.#cells = createCellElements(gridElement).map((cellElement, index) => {
            return new Cell(cellElement, index % GRID_SIZE, Math.floor(index / GRID_SIZE))
        })
        // inspect to see the respective x, y values to check if it's correct
        console.log(this.cells)
    }

    // getter function to get cells by column
    get cellsByColumn() {
        return this.#cells.reduce((cellGrid, cell) => {
            // create an array of array
            // cell.x represent row
            // cell.y represent column
            cellGrid[cell.x] = cellGrid[cell.x] || []
            cellGrid[cell.x][cell.y] = cell
            return cellGrid
        }, [])
    }

    // setting a private getter function to get all the empty cells
    get #emptyCells() {
        return this.#cells.filter(cell => cell.tile == null)
    }

    // Math.random return 0 to 1 
    // multiply length of empty cells
    // get random index of cells that are empty
    randomEmptyCell() {
        const randomIndex = Math.floor(Math.random() * this.#emptyCells.length)
        return this.#emptyCells[randomIndex]

    }
}

class Cell {
    #cellElement
    #x
    #y
    #tile

    constructor(cellElement, x, y) {
        this.#cellElement = cellElement
        this.#x = x
        this.#y = y
    }

    // getter function for x & y
    get x() {
        return this.#x
    }

    get y() {
        return this.#y
    }

    get tile() {
        return this.#tile
    }

    set tile(value) {
        this.#tile = value
        if (value == null) return

        // if tile has value (x & y position), we want to assign it to the cell value for x & y
        // telling the tile that it has move to the new x and y position
        // handle by tile class
        this.#tile.x = this.#x
        this.#tile.y = this.#y
    }

    canAccept(tile) {
        // make sense only one merge happen at the same level
        return (this.tile == null || (this.mergeTile == null && this.tile.value === tile.value))
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