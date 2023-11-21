document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return null;
    }

    function checkDraw() {
        return gameBoard.every(cell => cell !== '');
    }

    function handleCellClick(index) {
        if (!gameBoard[index] && gameActive) {
            gameBoard[index] = currentPlayer;
            cells[index].textContent = currentPlayer;

            const winner = checkWinner();
            const draw = checkDraw();

            if (winner) {
                status.textContent = `Player ${winner} wins!`;
                gameActive = false;
            } else if (draw) {
                status.textContent = "It's a draw!";
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `Current Player: ${currentPlayer}`;
            }
        }
    }

    function restartGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;

        status.textContent = 'Current Player: X';

        cells.forEach(cell => {
            cell.textContent = '';
        });
    }

    function handleClick(index) {
        if (gameActive) {
            handleCellClick(index);
        } else {
            restartGame();
        }
    }

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleClick(index));
    });

    restartGame();
});
