
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






