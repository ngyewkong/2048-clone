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