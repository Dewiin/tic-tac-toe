const Gameboard = (function () {
    let board = Array(9).fill(null);

    const getBoard = () => [...board];

    const makeMove = (mark, index) => {
        if(!board[index]) {
            board[index] = mark;
            return true;
        }
        return false;
    }

    const checkWinner = () => {
        const win = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],    // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],    // columns
            [0, 4, 8], [2, 4, 6]                // diagonals
        ];

        for(const pattern of win) {
            const [a, b, c] = pattern;
            if(board[a] && board[a] == board[b] && board[a] == board[c]) {
                return [board[a], [a, b, c]];
            }
        };

        return (board.includes(null)) ? null : 'tie';
    }
    
    const reset = () => {
        board = Array(9).fill(null);
    }

    return {getBoard, makeMove, checkWinner, reset};
})();


const createUser = (name, player) => {
    const user = (player == 1) ? document.querySelector('.player-one-score').firstElementChild : document.querySelector('.player-two-score').firstElementChild;
    user.textContent = name;
    
}

const initializeGame = (function() {
    const createPlayers = (nameOne, nameTwo) => {
        const userOne = createUser(nameOne, 1);
        const userTwo = createUser(nameTwo, 2);
        return {userOne, userTwo};
    }

    const play = (mark, index) => {
        if(!Gameboard.makeMove(mark, index)) {
            return false;
        }

        const board = Gameboard.getBoard();

        board.forEach((mark, index) => {
            if(mark == 'X') {
                boardField[index].innerHTML = 
                `<img src="assets/alpha-x.svg">` ;
            }
            else if(mark == 'O') {
                boardField[index].innerHTML = 
                `<img src="assets/alpha-o.svg">`;
            }
        });

        return true;
    }

    const checkWin = () => {
        const win = Gameboard.checkWinner();

        if(win) {
            boardField.forEach((field) => {
                field.style.pointerEvents = "none";
            });

            if(Array.isArray(win)) {
                win[1].forEach((index) => {
                    boardField[index].style.backgroundColor = "#d64933";
                });
            }

            if(win[0] == 'X') {
                playerOne.children[1].textContent++;
            }
            else if(win[0] == 'O') {
                playerTwo.children[1].textContent++;
            }
            else {
                playerOne.children[1].textContent++;
                playerTwo.children[1].textContent++;
            }

            return true;
        }
        
        return false;
    }

    const reset = () => {
        Gameboard.reset();

        boardField.forEach((field) => {
            field.innerHTML = "";
            field.style.backgroundColor = "rgb(47, 50, 58)";
        })
    }

    return {play, checkWin, reset, createPlayers};
})();


const playerOne = document.querySelector(".player-one-score");
const playerTwo = document.querySelector(".player-two-score");
const boardField = document.querySelectorAll(".board-field");
initializeGame.createPlayers("Me", "You");
boardField.forEach((field, index) => {
    field.addEventListener("click", () => {
        if(playerOne.classList.contains("active")) {
            if(initializeGame.play("X", index)) {
                playerOne.classList.toggle("active");
                playerTwo.classList.toggle("active");
            }
        }
        else {
            if(initializeGame.play("O", index)) {
                playerOne.classList.toggle("active");
                playerTwo.classList.toggle("active");
            }
        }

        if(initializeGame.checkWin()) {
            initializeGame.createPlayers("Me", "You");
        }       
    });
});