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