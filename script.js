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
    window.addEventListener("swiped", handleMobileInput, { once: true })
}

// animation not working as intended
// as the calls for move up down left right 
// not waiting for the slideTiles function to carry out the animations
// use await and async
// wait for the function to finish before calling the grid.cells.forEach code line
async function handleInput(e) {
    console.log(e.key)
    switch (e.key) {
        // the cases are the key names for the arrow keys
        case "ArrowUp":
            // handle for when movement is not allowed 
            // should not generate new tile
            if (!canMoveUp()) {
                setupInput()
                return
            }
            await moveUp()
            break

        case "ArrowDown":
            if (!canMoveDown()) {
                setupInput()
                return
            }
            await moveDown()
            break

        case "ArrowLeft":
            if (!canMoveLeft()) {
                setupInput()
                return
            }
            await moveLeft()
            break

        case "ArrowRight":
            if (!canMoveRight()) {
                setupInput()
                return
            }
            await moveRight()
            break
        default:
            // default only happens when no valid user input is happening
            // rerun setupInput to automatically wait for another userinput
            // exit out of handleInput function
            setupInput()
            break
    }

    // other code to add in new tiles
    // handle the merged part
    // cell is private variable need getter function
    grid.cells.forEach(cell => cell.mergeTiles())

    // handle addition of new tiles after movement
    // new tile inside the gameboard
    const newTile = new Tile(gameBoard)
    
    // set a random empty cell in the gameboard to the new tile generated
    grid.randomEmptyCell().tile = newTile

    // loose check for if cannot move tile -> end game
    if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
        // waitForTransition() animation parameter is false by default
        newTile.waitForTransition(true).then(() => {
            // when animation of the tile finish appearing
            // return alert window to signal end of game 
            // alert("You Lose.")

            popupAlert("You ran out of moves! You lose! Click Okay to start a new game.")
        })
        return 
    }

    // loose check for win condition
    const checkTiles = document.getElementsByClassName("tile")
    let winningCondition = false
        
    for (let i = 0; i < checkTiles.length; i++) {
        console.log(checkTiles[i].textContent)
        if (checkTiles[i].textContent === "2048") {
            winningCondition = true
        
            // waitForTransition() animation parameter is false by default
            newTile.waitForTransition(winningCondition).then(() => {
                popupAlert("Congratulations for hitting 2048! You Win! Click Okay to start a new game.")
            })
            window.removeEventListener("keydown")
        }}
        console.log(winningCondition)

    setupInput()
}

// handle mobile input (swiping)
async function handleMobileInput(e) {
    switch (e.detail.dir) {
      case "up":
        if (!canMoveUp()) {
          setupInput();
          return;
        }
        await moveUp();
        break;
      case "down":
        e.preventDefault();
        if (!canMoveDown()) {
          setupInput();
          return;
        }
        await moveDown();
        break;
      case "left":
        if (!canMoveLeft()) {
          setupInput();
          return;
        }
        await moveLeft();
        break;
      case "right":
        if (!canMoveRight()) {
          setupInput();
          return;
        }
        await moveRight();
        break;
      default:
        setupInput();
        return;
    }
  
    grid.cells.forEach((cell) => cell.mergeTiles());
  
    const newTile = new Tile(gameBoard);
    grid.randomEmptyCell().tile = newTile;
  
    if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
      newTile.waitForTransition(true).then(() => {
        // when animation of the tile finish appearing
        // return alert window to signal end of game 
        // alert("You Lose.")

        popupAlert("You ran out of moves. You lose. Click okay to start a new game.")
      });
      return;
    }

    // loose check for win condition
    const checkTiles = document.getElementsByClassName("tile")
    let winningCondition = false
        
    for (let i = 0; i < checkTiles.length; i++) {
        console.log(checkTiles[i].textContent)
        if (checkTiles[i].textContent === "2048") {
            winningCondition = true

            // waitForTransition() animation parameter is false by default
            newTile.waitForTransition(winningCondition).then(() => {
                popupAlert("Congratulations for hitting 2048! You Win! Click Okay to start a new game.")
            })
            window.removeEventListener("swiped")
        }}
        console.log(winningCondition)
  
    setupInput();
  }

function moveUp() {
    // check by columns for up & down 
    // so that we can check what the value of each tile before merging
    slideTiles(grid.cellsByColumn)
}

function moveDown() {
    // check by columns for up & down 
    // so that we can check what the value of each tile before merging
    // but for down need to reverse the cellsByColumn
    // using map & spread operator to create a new array and reverse
    // do not want to touch the underlying array
    slideTiles(grid.cellsByColumn.map(column => [...column].reverse()))
}

function moveLeft() {
    // check by rows for left 
    // so that we can check what the value of each tile before merging
    slideTiles(grid.cellsByRow)
}

function moveRight() {
    // check by rows for up & down 
    // so that we can check what the value of each tile before merging
    slideTiles(grid.cellsByRow.map(row => [...row].reverse()))
}

// need to use Promises to get the await to work 
// Promises.all
function slideTiles(cells) {
    return Promise.all(
        // instead of forEach need to use flatMap
        // flatMap works like map
        // but flatten out the result into 1 dimensional array instead of multi-dimensional
    cells.flatMap(group => {
        // set up promises as empty array
        const promises = []
        // loop through the full group
        // i = 1 as i = 0 cannot move (top cell alr)
        for (let i = 1; i < group.length; i++) {
            const cell = group[i]

            // check if the cell we are on is null
            // if null then continue and ignore the bottom code
            if (cell.tile == null) continue

            let lastValidCell
            // go through the remaining tiles in this column
            // to check if merge can happen
            for (let j = i - 1; j >= 0; j--) {
                const moveToCell = group[j]
                // if cannot move, exit
                if (!moveToCell.canAccept(cell.tile)) break
                lastValidCell = moveToCell
            }
            if (lastValidCell != null) {
                // add to promises everytime there is a tile that can move
                // add a promise that ask to wait for the animation to finish
                promises.push(cell.tile.waitForTransition())
                if (lastValidCell.tile != null) {
                    lastValidCell.mergeTile = cell.tile
                } else {
                    lastValidCell.tile = cell.tile
                }
                cell.tile = null
            }
        }
        // return the promises array here
        return promises 
    }))
}

function canMoveUp() {
    return canMove(grid.cellsByColumn)
}

function canMoveDown() {
    return canMove(grid.cellsByColumn.map(column => [...column].reverse()))
}

function canMoveLeft() {
    return canMove(grid.cellsByRow)
}

function canMoveRight() {
    return canMove(grid.cellsByRow.map(row => [...row].reverse()))
}

function canMove(cells) {
    // return a column
    return cells.some(group => {
        return group.some((cell, index) => {
            // check if any cell can move
            // return false if the cell index is 0 (at the top already)
            // return false is cell is empty
            if (index === 0) return false
            if (cell.tile == null) return false

            // check if the cell directly above can accept the cell
            const moveToCell = group[index - 1]
            //return true if the above cell can accept
            return moveToCell.canAccept(cell.tile)
        })
    })
}

function popupAlert(msg) {
    if (confirm(msg)) {
        console.log("refreshing...")
        window.location.reload() 

    } else {
        console.log("exiting popup...")
    }
}