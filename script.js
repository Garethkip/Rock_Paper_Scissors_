// game choices
const choicesArr = ['🪨','📜','✂️','🪨','✂️','📜','✂️','🪨','📜'];

const displayArea = document.getElementById('selectionDisplay');
const computerScore = document.getElementById("computerScore");
const playerScore = document.getElementById("playerScore");
const computer = document.getElementById("player1");
const player = document.getElementById("player2");
const playbtn = document.getElementById("playbtn");
const resetbtn = document.getElementById("resetbtn");

const rock = document.getElementById("Rock");
const paper = document.getElementById("Paper");
const scissors = document.getElementById("Scissors");

const date = new Date();
const copyright = document.getElementById('footer');

copyright.innerHTML = `
            <p>
                &copy; ${date.getFullYear()} RPS Website
            </p>`;


computerScore.innerText = `Computer: ${localStorage.getItem("computerpts")} pts`
playerScore.innerText = `Player: ${localStorage.getItem("playerpts")} pts`

player.innerText = localStorage.getItem("playerChoice")==null?`Player`:localStorage.getItem("playerChoice");
computer.innerText = localStorage.getItem("playerChoice")==null?`Computer`:localStorage.getItem("computerChoice");

let winner = null;
let reset = true;

rock.addEventListener('click', () => {
    console.log('Rock selected');
    localStorage.setItem("playerChoice",choicesArr[0]);  
    console.log(localStorage.getItem("playerChoice"));
    updateGame();
});

paper.addEventListener('click', () => {
    console.log('Paper selected');
    localStorage.setItem("playerChoice",choicesArr[1]);
    updateGame();
});

scissors.addEventListener('click', () => {
    console.log('Scissors selected');
    localStorage.setItem("playerChoice",choicesArr[2]);
    updateGame();
});

resetbtn.addEventListener('click', () => {
    console.log('Reset selected');
    location.reload();
    resetGame();
    updateGame();
});

function resetGame(){
    localStorage.removeItem("playerChoice");
    localStorage.removeItem("computerChoice");
    localStorage.removeItem("playerpts");
    localStorage.removeItem("computerpts");
    
    
}

function endGame(){
    displayArea.textContent = `${winner} has won! Hurraaay!`;
    reset = false;
    resetGame();  
}

function updateGame(){
    let computerSelection = Math.floor(Math.random()*9);
    localStorage.setItem("computerChoice",choicesArr[computerSelection]);

    if(reset==true){
        player.innerText = localStorage.getItem("playerChoice")==null?`Player`:localStorage.getItem("playerChoice");
        computer.innerText = localStorage.getItem("playerChoice")==null?`Computer`:localStorage.getItem("computerChoice");
    }
    
    let playerpts = Number(localStorage.getItem("playerpts"));
    let computerpts = Number(localStorage.getItem("computerpts"));

    switch(localStorage.getItem("playerChoice")){
       
        case '🪨':
            playerpts += localStorage.getItem("computerChoice")=='✂️'?1:0;
            computerpts += localStorage.getItem("computerChoice")=='📜'?1:0;
            break;
        case '📜':
            playerpts += localStorage.getItem("computerChoice")=='🪨'?1:0;
            computerpts += localStorage.getItem("computerChoice")=='✂️'?1:0;
            break;
        case '✂️':
            playerpts += localStorage.getItem("computerChoice")=='📜'?1:0;
            computerpts += localStorage.getItem("computerChoice")=='🪨'?1:0;
            break;
        default:
            console.log(`Select btwn '🪨','📜' or '✂️'`);
    }

    localStorage.setItem("playerpts",playerpts);
    localStorage.setItem("computerpts",computerpts);

    if(reset==true){
        computerScore.innerText = `Computer: ${localStorage.getItem("computerpts")} pts`
        playerScore.innerText = `Player: ${localStorage.getItem("playerpts")} pts`
    }

    let difference = Number(localStorage.getItem("computerpts"))-Number(localStorage.getItem("playerpts"));
    console.log(difference);
    if(difference>=5){
        console.log(`Computer won`);
        winner = `Computer`;
        endGame();
    }else if(difference<=-5){
        console.log(`Player won`);
        winner = `Player`;
        endGame();
    }
}

