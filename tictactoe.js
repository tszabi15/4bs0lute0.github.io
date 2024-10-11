let cells = document.querySelectorAll(".cell-grid");
let nextTurn = document.getElementById("turn");
let errorText = document.getElementById("errorMess");
let restartButton = document.getElementById("restart");
let rect = errorText.getBoundingClientRect();
let winner;
const errorText_centerX = (window.innerWidth - errorText.clientWidth) / 2
let turn = 1;

const winningCombinations = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonal
    [2, 4, 6]
];

function checkWin() {
    let winner = false;
    winningCombinations.forEach(win => {
        if (cells[win[0]].textContent === cells[win[1]].textContent 
            && cells[win[1]].textContent === cells[win[2]].textContent){
            winner = cells[win[0]].textContent;
            return true;
        }
    });
    return winner;
}

cells.forEach(function(cell, index) {
    cell.addEventListener("click", function(){
        if (winner){return};
        if (cell.textContent !== "") {
            errorText.textContent = "HĂ©Ă©Ă©! Ez mĂˇr ki volt vĂˇlasztva!"
            errorText.opacity = 1;
            gsap.killTweensOf(errorText);
            gsap.fromTo(errorText, 
                { x: 0 }, //from
                { //TO
                    x: errorText_centerX, 
                    duration: 1,
                    yoyo: true,
                    ease: "power1.inOut"
                }
            );
            gsap.fromTo(errorText,
                {opacity: 1},
                { 
                    opacity: 0, 
                    duration: 1, delay: 1 
                }
            );
            return;
        }
        if (turn % 2 == 0) {
            if (cell.textContent === "") {
                cell.textContent = "X";
                nextTurn.textContent = "O Turn!"
            }
        }else{
            cell.textContent = "O";
            nextTurn.textContent = "X Turn!"
        }
        winner = checkWin();
        if (winner){
            nextTurn.textContent = "Game over! " + winner + " won!"
            restartButton.style.display = "block";
            return;
        }
        turn++;
        
    });
});

restartButton.addEventListener("click", function(){
    location.reload();
});
