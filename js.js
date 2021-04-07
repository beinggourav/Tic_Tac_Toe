

var blocks = document.querySelectorAll("td");
var startOver = document.querySelector("#b1");

startOver.addEventListener("click", function () {
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].textContent = "";
    }
});


var turn = "X";
function setTurn(){
    this.textContent=turn;
    changeTurn();
}

for (let i = 0; i <blocks.length; i++) {
    blocks[i].addEventListener('click', setTurn);
}

function changeTurn(){
    if(winner(turn)){
        document.querySelector("#msg").textContent=turn+" wins!";
    }else if(turn==="X"){
        turn="O";
        document.querySelector("#msg").textContent="It's "+turn+" Turn";
    }else{
        turn="X";
        document.querySelector("#msg").textContent="It's "+turn+" Turn";
    }
}
function winner(turn){
    var result=false;
    if(check(0,1,2,turn) ||
        check(3,4,5,turn) ||
        check(6,7,8,turn) ||
        check(0,3,6,turn) ||
        check(1,4,7,turn) ||
        check(2,5,8,turn) ||
        check(0,4,8,turn) ||
        check(2,4,6,turn)){
            result=true;
    }
    return result;
    
}
function check(a,b,c,turn){
    var result=false;
    if(blocks[a].textContent===turn && blocks[b].textContent===turn && blocks[c].textContent===turn){
        result=true;
    }
    return result;
}
