
// Selectors for chosing opponent screen & player or AI selection
// Event listeners to hide and show respect divs and change header on bttn press
const introContainer = document.getElementById('intro')
const chooseOpponentBttn = document.getElementById('opponet-selector')
const modalSelection = document.getElementById('modal-container')
chooseOpponentBttn.addEventListener('click', () => modalSelection.style.display = 'flex')
chooseOpponentBttn.addEventListener('click', () => introContainer.style.display = 'none')

const gameContainer = document.getElementById('game-container')
const playPersonBttn = document.getElementById('play-person')
const playAiBttn = document.getElementById('player-ai')
const gameHeader = document.getElementById('game-header')

playPersonBttn.addEventListener('click', () => gameContainer.style.display = 'flex')
playPersonBttn.addEventListener('click', () => modalSelection.style.display = 'none')
playPersonBttn.addEventListener('click', () => gameHeader.innerHTML = 'Player vs Player')
playAiBttn.addEventListener('click', () => gameContainer.style.display = 'flex')
playAiBttn.addEventListener('click', () => modalSelection.style.display = 'none')
playAiBttn.addEventListener('click', () => gameHeader.innerHTML = 'Player vs AI')

const mainMenu = document.getElementById('main-menu')
mainMenu.addEventListener('click', () => gameContainer.style.display = 'none')
mainMenu.addEventListener('click', () => introContainer.style.display = 'flex')



// Game board module
const gameBoardModule = (() => {

    // Variable for board state & game state
    let board = [[null, null, null],[null, null, null],[null, null, null]]
    let gameIsOver = false

    // Check if cell empty
    const isEmpty = (row,col) => board[row][col] === null

    // Win conditions checking
    const checkHoriz = () => {
        for (let row = 0; row < 3;row++) {
            if (board[row][0] === board[row][1] && board[row][1] === board[row][2] && board[row][0] !== null){
                return board[row][0]
            }
        }
        return null;
    }
    const checkVert = () => {
        for (let col = 0; col < 3; col++) {
            if (board[0][col] === board[1][col] && board[1][col] === board[2][col] && board[0][col] !== null) {
                return board[0][col];
            }
        }
        return null;
    }
    const checkDiagonal = () => {
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] || board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            if (board[1][1] !== null){
                return board[1][1]
            }
        }
        return null;
    }

    // Returns various functions to gameBoardModule
    return {
        // makes a move
        makeMove(row, col ,player){
            if (isEmpty(row, col)) {
                board[row][col] = player
                return true
            }
            return false
        },
        // checks if cell is full
        isFull(){
            for (let row = 0; row<3; row++){
                for(let col = 0; col < 3; col++){
                    if(isEmpty(row, col)){
                        return false
                    }
                }
            }
            return true
        },
        // checking for winner
        checkWinner(){
            const horizWinner = checkHoriz()
            const vertWinner = checkVert()
            const digaonalWinner = checkDiagonal()

            if (horizWinner){
                return horizWinner
            }
            if(vertWinner){
                return vertWinner
            }
            if(digaonalWinner){
                return digaonalWinner
            }
            return null
        },
        // game over function
        isGameOver() {
            return gameIsOver;
        },
        setGameOver(value){
            gameIsOver = value
        },
        // resetting gameboard
        reset(){
            board = [[null, null, null],[null, null, null],[null, null, null]];
        },

    };
})();


// Making a player factory
const PlayerFactory = () => {
    let currentPlayer = 'X'
    return {
        getCurrentPlayer() {
            return currentPlayer
        },
        switchPlayer() {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
        },
        resetPlayer() {
            currentPlayer = 'X'
        },
    };
};

// Event listeners for game mode selection
let isPlayerAI = false
playAiBttn.addEventListener('click', () => isPlayerAI = true)
playPersonBttn.addEventListener('click', () => isPlayerAI = false)

// Game board declarations
const cells = document.querySelectorAll('.cell')
const playerFactory = PlayerFactory()
const restartBttn = document.getElementById('restart')

// Function to reset game
function resetGame() {
    gameBoardModule.reset();
    cells.forEach((cell) => {
        cell.textContent = ''
    });
    playerFactory.resetPlayer()
    gameBoardModule.setGameOver(false)
}

const winnerHeader = document.getElementById('winner-header')

// AI moves after player moves function
function AIMove(){
    const emptyCells = Array.from(cells).filter(cell => !cell.textContent);

    if (emptyCells.length === 0){
        return
    }
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
    const row =  parseInt(randomCell.getAttribute('data-row'))
    const col =  parseInt(randomCell.getAttribute('data-col'))
    const currentPlayer = playerFactory.getCurrentPlayer()

    const moveSuccess = gameBoardModule.makeMove(row, col, currentPlayer);
    if(moveSuccess){
        randomCell.textContent = currentPlayer
        playerFactory.switchPlayer();
        const winner = gameBoardModule.checkWinner()
        const fullBoard = gameBoardModule.isFull()

        if(winner){
            gameBoardModule.setGameOver(true)
            setTimeout(()=> {
                winnerHeader.innerHTML = `Winner: ${winner}`
            }, 50);
        } else if (fullBoard){
            gameBoardModule.setGameOver(true)
            setTimeout(()=> {
                winnerHeader.innerHTML = 'It\'s a tie!'
            }, 50);
        }
    }
}

// Adding X or O on clicked cell
cells.forEach((cell)=> {
    cell.addEventListener('click', ()=>{
        if(gameBoardModule.isGameOver()){
            return
        }
        if(!cell.textContent){
            const row = parseInt(cell.getAttribute('data-row'))
            const col = parseInt(cell.getAttribute('data-col'))
            const currentPlayer = playerFactory.getCurrentPlayer()
            const moveSuccess = gameBoardModule.makeMove(row, col, currentPlayer)

            if (moveSuccess){
                cell.textContent = currentPlayer
                playerFactory.switchPlayer()

                const winner = gameBoardModule.checkWinner()
                const fullBoard = gameBoardModule.isFull()

                if(winner){
                    gameBoardModule.setGameOver(true)
                    setTimeout(()=> {
                        winnerHeader.innerHTML = `Winner: ${winner}`
                    }, 50);
                } else if (fullBoard){
                    gameBoardModule.setGameOver(true)
                    setTimeout(()=> {
                        winnerHeader.innerHTML = 'It\'s a tie!'
                    }, 50);
                }
                if(isPlayerAI){
                    AIMove()
                }
            }
        }
    });
});


restartBttn.addEventListener('click',() => {
    resetGame()
    winnerHeader.innerHTML = ''
});
mainMenu.addEventListener('click',() => {
    resetGame()
    winnerHeader.innerHTML = ''
});