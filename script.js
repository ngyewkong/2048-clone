// treating grid, cell, tile as individual classes/components

import Grid from "./Grid.js"

const gameBoard = document.getElementById("game-board")

// initialise a new Grid object
const grid = new Grid(gameBoard)