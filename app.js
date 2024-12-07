let msg = document.querySelector("#msg");
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let startBtn = document.querySelector("#start-btn");
let newGameBtn = document.querySelector("#start-again");
let msgContainer = document.querySelector(".msg-container");

let turnO = true;
let count = 0;
let player1Emoji = "😜";  
let player2Emoji = "😎";

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

let resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    msg.innerText = "";
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = player1Emoji;
            turnO = false;
            //box.style.color = "blue";
        } else {
            box.innerText = player2Emoji;
            turnO = true;
        }
        box.disabled = true;
        count++;
        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showResult = (result) => {
    msg.innerText = result;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

startBtn.addEventListener("click", () => {
player1Emoji = document.querySelector("#emoji1").value || "😜";
player2Emoji = document.querySelector("#emoji2").value || "😎";
resetGame();
});

const checkWinner = () => {
    for (const pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (
            boxes[a].innerText &&
            boxes[a].innerText === boxes[b].innerText &&
            boxes[a].innerText === boxes[c].innerText
        ) {
            showResult(`🎉Congratulations, The winner is "${boxes[a].innerText}"`);
            return;
        }
    }

    if (count === 9) {
        showResult("It's a Draw!😆");
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame); 