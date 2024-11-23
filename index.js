// Select elements
const tiles = Array.from(document.querySelectorAll('.tile'));
const playerDisplay = document.querySelector('.display-player');
const announcer = document.querySelector('.announcer');
const resetButton = document.querySelector('#reset');

// Game variables
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

// Winning combinations
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Functions
const handleResultValidation = () => {
    let roundWon = false;
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        announce(currentPlayer === 'X' ? 'PLAYER_X_WON' : 'PLAYER_O_WON');
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        announce('TIE');
    }
};

const announce = (type) => {
    switch (type) {
        case 'PLAYER_X_WON':
            announcer.innerHTML = 'Player <span class="playerx">X</span> Won!';
            break;
        case 'PLAYER_O_WON':
            announcer.innerHTML = 'Player <span class="playero">O</span> Won!';
            break;
        case 'TIE':
            announcer.innerText = 'It\'s a Tie!';
            break;
    }
    announcer.classList.remove('hide');
};

const isValidAction = (tile) => {
    return tile.innerText === '';
};

const updateBoard = (index) => {
    board[index] = currentPlayer;
};

const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer.toLowerCase()}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer.toLowerCase()}`);
};

const userAction = (tile, index) => {
    if (isValidAction(tile) && isGameActive) {
        tile.innerText = currentPlayer;
        tile.classList.add(`player${currentPlayer.toLowerCase()}`);
        updateBoard(index);
        handleResultValidation();
        if (isGameActive) {
            changePlayer();
        }
    }
};

const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    announcer.classList.add('hide');

    if (currentPlayer === 'O') {
        changePlayer();
    }

    tiles.forEach(tile => {
        tile.innerText = '';
        tile.classList.remove('playerx', 'playero');
    });
};

// Event listeners
tiles.forEach((tile, index) => {
    tile.addEventListener('click', () => userAction(tile, index));
});

resetButton.addEventListener('click', resetBoard);
