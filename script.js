// treating grid, cell, tile as individual classes/components

import Grid from "./Grid.js"
import Tile from "./Tile.js"

const gameBoard = document.getElementById("game-board")

// initialise a new Grid object
const grid = new Grid(gameBoard)

// generate two random tiles to start the game
// 2 tiles placed randomly
// with values of either 2 or 4
console.log(grid.randomEmptyCell())
grid.randomEmptyCell().tile = new Tile(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard)

// call setupInput function
setupInput()
console.log(grid.cellsByColumn)

// handle user inputs
function setupInput() {
    // only do this once and it will remove it automatically
    // to wait for all the animations to run 
    window.addEventListener("keydown", handleInput, {once: true})
}

function handleInput(e) {
    console.log(e.key)
    switch (e.key) {
        // the cases are the key names for the arrow keys
        case "ArrowUp":
            moveUp()
            break

        case "ArrowDown":
            moveDown()
            break

        case "ArrowLeft":
            moveLeft()
            break

        case "ArrowRight":
            moveRight()
            break
        default:
            // default only happens when no valid user input is happening
            // rerun setupInput to automatically wait for another userinput
            // exit out of handleInput function
            setupInput()
            break
    }

    // other code to add in new tiles

    setupInput()
}

function moveUp() {
    // check by columns for up & down 
    // so that we can check what the value of each tile before merging
    slideTiles(grid.cellsByColumn)
}

function slideTiles(cells) {
    cells.forEach(group => {
        // loop through the full group
        // i = 1 as i = 0 cannot move (top cell alr)
        for (let i = 1; i < group.length; i++) {
            const cell = group[i]
            let lastValidCell
            // go through the remaining tiles in this column
            // to check if merge can happen
            for (let j = i - 1; j >= 0; j--) {
                const moveToCell = group[j]
                // if cannot move, exit
                if (!moveToCell.canAccept(cell.title)) break
                lastValidCell = moveToCell
            }
            if (lastValidCell != null) {
                if (lastValidCell.tile != null) {
                    lastValidCell.mergeTile = cell.tile
                } else {
                    lastValidCell.tile = cell.tile
                }
                cell.tile = null
            }
        }
    })
}