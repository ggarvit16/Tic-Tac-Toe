let boxes= document.querySelectorAll(".box");
let resetBtn= document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let whoChance = document.querySelector(".chance");

let turn0=true; //playerX, player0

const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame=()=>{
    turn0=true;
    enableBoxes();
    msgContainer.classList.add("hide");
    whoChance.innerText="0s Turn";

}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "O";
            box.classList.add("fade-in");
            turn0 = false;
        } else {
            box.innerText = "X";
            box.classList.add("fade-in");
            turn0 = true;
        }
        box.disabled = true;
        checkWinner();
        chance();
    });
});

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("fade-in");
    }
};

const showWinner = (winner)=>{
    msg.innerText=`Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const draw = () => {
    msg.innerText = "It's a draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const chance=()=>{
    if(turn0){
        whoChance.innerText="0s Turn";
    }
    else{
        whoChance.innerText="Xs Turn";

    }
}

const checkWinner=()=>{
    for(let pattern of winPatterns){
        let isDraw=true;
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;

        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                console.log("Winner is", pos1Val);
                showWinner(pos1Val);
            }
        }
        
        // DRAW GAME LOGIC
        for (let box of boxes) {
            if (box.innerText === "") {
                isDraw = false;
                break;
            }
        }
    
        if (isDraw) {
            console.log("It's a draw!");
            draw();
        }
    }
}

resetBtn.addEventListener("click", resetGame);