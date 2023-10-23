// Selectors for chosing opponent screen & player or AI selection
// Event listeners to hide and show respect dives on bttn press
const introContainer = document.getElementById('intro')
const chooseOpponentBttn = document.getElementById('opponet-selector')
const modalSelection = document.getElementById('modal-container');
chooseOpponentBttn.addEventListener('click', () => modalSelection.style.display = 'block')
chooseOpponentBttn.addEventListener('click', () => introContainer.style.display = 'none')

const gameContainer = document.getElementById('game-container')
const playPersonBttn = document.getElementById('play-person')
const playAiBttn = document.getElementById('player-ai')

playPersonBttn.addEventListener('click', () => gameContainer.style.display = 'block')
playPersonBttn.addEventListener('click', () => modalSelection.style.display = 'none')
playAiBttn.addEventListener('click', () => gameContainer.style.display = 'block')
playAiBttn.addEventListener('click', () => modalSelection.style.display = 'none')



