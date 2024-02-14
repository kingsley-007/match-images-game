const symbols = ['🌟', '🌈', '🍎', '🚀', '🎉', '🌺', '🐳', '🎸'];

let cards = [...symbols, ...symbols];
let flippedCards = [];
let matchedPairs = 0;

// Shuffle the cards using Fisher-Yates algorithm
function shuffleCards() {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

// Function to create the game board
function createGameBoard() {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';

  for (let symbol of cards) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.symbol = symbol;
    card.textContent = '?';
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  }
}

// Function to handle card flipping
function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
    this.classList.add('flipped');
    this.textContent = this.dataset.symbol;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 800);
    }
  }
}

// Function to check if the flipped cards match
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.symbol === card2.dataset.symbol) {
    matchedPairs++;

    if (matchedPairs === symbols.length) {
      document.getElementById('result').textContent = 'Congratulations! You matched all pairs!';
    }
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    card1.textContent = '?';
    card2.textContent = '?';
  }

  flippedCards = [];
}

//Initialize the game
shuffleCards();
createGameBoard();
