/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]
];

/*---------------------------- Variables (state) ----------------------------*/
let board; 
let turn; 
let winner; 
let tie; 


/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const resetBtnEl = document.querySelector('#resetBtn')
// console.dir(squareEls)
// console.dir(messageEl)

/*-------------------------------- Functions --------------------------------*/

const init = () => {
    board = [
        '', '', '',
        '', '', '',
        '', '', ''
        ]; 
    turn = 'X'; 
    winner = false; 
    tie = false; 
        
    render()
}  

const render = () => {
   updateBoard()
   updateMessage()
}
const updateBoard = () => {

   board.forEach((value, idx) => {
        squareEls[idx].textContent = value;
   });
 
}

const updateMessage = () => {

    if (winner === false && tie === false){ // game in progress
        messageEl.textContent = `It's ${turn}'s turn`
    } else if (winner === false && tie === true){
        messageEl.textContent = `It's a tie!`
    } else if (winner === true && tie === false){
        messageEl.textContent = `Congratulations ${turn}, you won!`
    }
}


const handleClick = (event) => {
    const clicked = event.target
    const squareIndex = clicked.getAttribute('id')


    if (board[squareIndex] === 'X' || board[squareIndex] === '0') {
        return;
    }
    if (winner === true){
        return;
    }

    placePiece(squareIndex)
    checkforWinner()
    checkForTie()
    switchPlayerTurn()
    render()
}

const placePiece = (index) => {
    board[index] = turn 
    console.log(board)

}

const checkforWinner = () => {

    for (let i = 0; i < winningCombos.length; i++){
        const condition = winningCombos[i]
        const A = board[condition[0]]
        const B = board[condition[1]]
        const C = board[condition[2]]

        if (A === '' || B === '' || C === ''){
            continue;
        }
        else if (A === B && A === C){
            winner = true
        } 
       
    }

    console.log('winner status: ' + winner)

} 

const checkForTie = () => {

    if (winner){
        return;
    } 
    tie = !board.includes('');
    console.log('is tie? ' + tie)

}

const switchPlayerTurn = () => {
    if (winner === true){
        return; 
    } else {
        turn = (turn === 'X') ? '0' : 'X'; 
    }

    console.log('turn: ' + turn)
}

/*----------------------------- Event Listeners -----------------------------*/

init()

squareEls.forEach(square => {
    square.addEventListener('click', handleClick)
});

resetBtnEl.addEventListener('click', init)