
const redPlayerBox = document.querySelector(".redPlayer")
const bluePlayerBox = document.querySelector(".bluePlayer")
const winnerBox = document.querySelector("#result")

const gameElements = ["✊🏻" , "✋🏻" , "✌🏻"];


// Initialize variables to track player choices and animation intervals
let redPlayerChoice = null; // Stores the choice of the red player
let bluePlayerChoice = null; // Stores the choice of the blue player

let redPlayerInterval; // animations interval for red player
let bluePlayerInterval; // animations interval for blue player

let processingKey = false; // Boolean to indicate if key is pressed

let redTeamScore = 0;   // Initialize the red team's score
let blueTeamScore = 0; // Initialize the blue team's score

// Function to update and display scores
function updateScores() {
    const redScoreElement = document.querySelector(".red-score");
    const blueScoreElement = document.querySelector(".blue-score");
    
    redScoreElement.textContent = `Red Team: ${redTeamScore}`;
    blueScoreElement.textContent = `Blue Team: ${blueTeamScore}`;


}


// Listen for keydown events to start player animations 

document.addEventListener("keydown", (event) => {
    if (processingKey) {
        return;
    }
    if (event.key === "f" && redPlayerChoice === null) {
        processingKey = true;
        redPlayerInterval = setInterval(() => {
            redPlayerBox.textContent = getRandomElement(gameElements);
        }, 100);
    } else if (event.key === "j" && bluePlayerChoice === null) {
        processingKey = true;
        bluePlayerInterval = setInterval(() => {
            bluePlayerBox.textContent = getRandomElement(gameElements);
        }, 100);
    }
});


// Listen for keyup events to stop player animations and determine the winner

document.addEventListener("keyup", (event) => {
    if (event.key === "f" && redPlayerChoice === null) {
        processingKey = true; 
        clearInterval(redPlayerInterval);
        redPlayerChoice = getRandomElement(gameElements);
        redPlayerBox.textContent = redPlayerChoice;
        determineWinner();
        processingKey = false;

    }   else if (event.key === "j" && bluePlayerChoice === null) {
        clearInterval(bluePlayerInterval);
        bluePlayerChoice = getRandomElement(gameElements);
        bluePlayerBox.textContent = bluePlayerChoice;
        determineWinner();
        processingKey = false;
    }

// Event listener for the spacebar key to reset the game    

document.addEventListener("keydown", (event) => {
    if (event.key === " ") {
        resetGame();
    }
})
});

// Function to get random element from array

function getRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

// Function to determine the winner based on the game rules

function determineWinner() {
    if (redPlayerChoice && bluePlayerChoice) {
        if (redPlayerChoice == bluePlayerChoice) {
            winnerBox.textContent = "It's a tie!";
        } else if (
            (redPlayerChoice === "✊🏻" && bluePlayerChoice === "✌🏻") ||
            (redPlayerChoice === "✋🏻" && bluePlayerChoice === "✊🏻") ||
            (redPlayerChoice === "✌🏻" && bluePlayerChoice === "✋🏻")
        )   {
            winnerBox.textContent = "Red Team Wins!";
            redTeamScore++;
        } else {
            winnerBox.textContent = "Blue Team Wins!";
            blueTeamScore++;
        }
        updateScores(); // Update and display scores
    }
}

// Function to reset the game

function resetGame() {
    redPlayerChoice = null;
    bluePlayerChoice = null;
    clearInterval(redPlayerInterval);
    clearInterval(bluePlayerInterval);

    redPlayerBox.textContent = " ";
    bluePlayerBox.textContent = " ";
    winnerBox.textContent = "VS";
}