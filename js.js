
var blocks = document.querySelectorAll("td");
//var startOver = document.querySelector("#b2");

var turn;
var d;// to check for draw
var Xmoves;
var Omoves;
function start() {
    document.querySelector("#b4").disabled=true;
    document.querySelector("#p1").disabled=true;
    document.querySelector("#p2").disabled=true;
    // startOver.addEventListener("click", function () {
    //     for (let i = 0; i < blocks.length; i++) {
    //         blocks[i].textContent = "";
    //     }
    // });
    
    Xmoves = 0;
    Omoves = 0;
    d = 1;
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].textContent = "";
    }
    var player1 = document.querySelector("#p1").value;
    var player2 = document.querySelector("#p2").value;
    if (Math.random() < 0.5) {
        turn = "X";
        Xmoves++;
        document.querySelector("#msg").textContent = "It's " + player1 + " Turn";
    } else {
        turn = "O";
        Omoves++;
        document.querySelector("#msg").textContent = "It's " + player2 + " Turn";
    }
    function setTurn() {
        if (this.textContent === "") {
            this.textContent = turn;
            changeTurn();
            d++;
        }
    }
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].addEventListener('click', setTurn);
    }

    function changeTurn() {
        if (winner(turn)) {
            localStorage.setItem("Xmoves", Xmoves);
            localStorage.setItem("Omoves", Omoves);
            if (turn === "X") {
                document.querySelector("#msg").textContent = player1 + " wins!";
                localStorage.setItem("wins", player1);

            } else {
                document.querySelector("#msg").textContent = player2 + " wins!";
                localStorage.setItem("wins", player2);
            }
            window.location.href = "victory.html";
        } else if (d === 9) {
            localStorage.setItem("Xmoves", Xmoves);
            localStorage.setItem("Omoves", Omoves);
            window.location.href = "draw.html";
        } else if (turn === "X") {
            turn = "O";
            document.querySelector("#msg").textContent = "It's " + player2 + " Turn";
            Omoves++;
        } else {
            turn = "X";
            document.querySelector("#msg").textContent = "It's " + player1 + " Turn";
            Xmoves++;
        }
    }
    localStorage.setItem("player1", player1);
    localStorage.setItem("player2", player2);
}

function winner(turn) {
    var result = false;
    if (check(0, 1, 2, turn) ||
        check(3, 4, 5, turn) ||
        check(6, 7, 8, turn) ||
        check(0, 3, 6, turn) ||
        check(1, 4, 7, turn) ||
        check(2, 5, 8, turn) ||
        check(0, 4, 8, turn) ||
        check(2, 4, 6, turn)) {
        result = true;
    }
    return result;
}

function check(a, b, c, turn) {
    var result = false;
    if (blocks[a].textContent === turn && blocks[b].textContent === turn && blocks[c].textContent === turn) {
        result = true;
    }
    return result;
}


/* For tournament */
var tXwins = 0;
var tOwins = 0;
var tDraw = 0;
function tour() {
    document.getElementById("score").style.display = "initial";
    document.querySelector("#b3").disabled=true;
    document.querySelector("#p1").disabled=true;
    document.querySelector("#p2").disabled=true;
    // Xmoves = 0;
    // Omoves = 0;
    d = 1;
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].textContent = "";
    }
    var player1 = document.querySelector("#p1").value;
    var player2 = document.querySelector("#p2").value;
    document.querySelector("#X").textContent = player1 + ": " + tXwins;
    document.querySelector("#O").textContent = player2 + ": " + tOwins;
    if (Math.random() < 0.5) {
        turn = "X";
        // Xmoves++;
        document.querySelector("#msg").textContent = "It's " + player1 + " Turn";
    } else {
        turn = "O";
        // Omoves++;
        document.querySelector("#msg").textContent = "It's " + player2 + " Turn";
    }
    function setTurn() {
        if (this.textContent === "") {
            this.textContent = turn;
            changeTurn();
            d++;
        }
    }
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].addEventListener('click', setTurn);
    }

    function changeTurn() {
        if (winner(turn)) {
            // localStorage.setItem("Xmoves", Xmoves);
            // localStorage.setItem("Omoves", Omoves);
            if (turn === "X") {
                tXwins++;
                document.querySelector("#X").textContent = player1 + ": " + tXwins;
                document.getElementById("winner-name").textContent = player1 + " Wins!";
                document.getElementById("tour-winning").style.display = "flex";
                // localStorage.setItem("wins", player1);

            } else {
                tOwins++;
                document.querySelector("#O").textContent = player2 + ": " + tOwins;
                document.getElementById("winner-name").textContent = player2 + " Wins!";
                document.getElementById("tour-winning").style.display = "flex";
            }
            if ((tOwins + tXwins + tDraw) < 3) {
                document.getElementById("tour-btn").addEventListener('click', function () {
                document.getElementById("tour-winning").style.display = "none";
                tour();
                });
            } else if (tXwins > tOwins && (tOwins + tXwins + tDraw === 3)) {
                document.getElementById("winner-name").textContent = player1 + " Won the tournament";
                document.getElementById("overAll").innerHTML="Over all Score"+"<br>" + player1 + ": " + tXwins + "<br>" + player2 + ": " + tOwins;
                document.getElementById("tour-btn").textContent = "New Game";
                document.getElementById("tour-btn").addEventListener('click', function () {
                    window.location.href = "index.html";
                })
            } else if (tXwins < tOwins && (tOwins + tXwins + tDraw === 3)) {
                document.getElementById("winner-name").textContent = player2 + " Won the tournament";
                document.getElementById("overAll").innerHTML="Over all Score"+"<br>" + player1 + ": " + tXwins + "<br>" + player2 + ": " + tOwins;
                document.getElementById("tour-btn").textContent = "New Game";
                document.getElementById("tour-btn").addEventListener('click', function () {
                    window.location.href = "index.html";
                })
            } else {
                document.getElementById("winner-name").textContent = "Tournament Draw!";
                document.getElementById("overAll").innerHTML="Over all Score"+"<br>" + player1 + ": " + tXwins + "<br>" + player2 + ": " + tOwins;
                document.getElementById("tour-btn").textContent = "New Game";
                document.getElementById("tour-btn").addEventListener('click', function () {
                    window.location.href = "index.html";
                })
            }
            // localStorage.setItem("wins", player2);
        } else if (d === 9) {
            tDraw++;
            // localStorage.setItem("Xmoves", Xmoves);
            // localStorage.setItem("Omoves", Omoves);
            // window.location.href = "draw.html";
            document.getElementById("winner-name").textContent = "Match draw!";
            document.getElementById("tour-winning").style.display = "flex";
            if ((tOwins + tXwins + tDraw) < 3) {
                document.getElementById("tour-btn").addEventListener('click', function () {
                document.getElementById("tour-winning").style.display = "none";
                tour();
                });
            } else if (tXwins > tOwins && (tOwins + tXwins + tDraw === 3)) {
                document.getElementById("winner-name").textContent = player1 + " Won the tournament";
                document.getElementById("overAll").innerHTML="Over all Score"+"<br>" + player1 + ": " + tXwins + "<br>" + player2 + ": " + tOwins;
                document.getElementById("tour-btn").textContent = "New Game";
                document.getElementById("tour-btn").addEventListener('click', function () {
                    window.location.href = "index.html";
                })
            } else if (tXwins < tOwins && (tOwins + tXwins + tDraw === 3)) {
                document.getElementById("winner-name").textContent = player2 + " Won the tournament";
                document.getElementById("overAll").innerHTML="Over all Score"+"<br>" + player1 + ": " + tXwins + "<br>" + player2 + ": " + tOwins;
                document.getElementById("tour-btn").textContent = "New Game";
                document.getElementById("tour-btn").addEventListener('click', function () {
                    window.location.href = "index.html";
                })
            } else {
                document.getElementById("winner-name").textContent = "Tournament Draw!";
                document.getElementById("overAll").innerHTML="Over all Score"+"<br>" + player1 + ": " + tXwins + "<br>" + player2 + ": " + tOwins;
                document.getElementById("tour-btn").textContent = "New Game";
                document.getElementById("tour-btn").addEventListener('click', function () {
                    window.location.href = "index.html";
                })
            }
        } else if (turn === "X") {
            turn = "O";
            document.querySelector("#msg").textContent = "It's " + player2 + " Turn";
            // Omoves++;
        } else {
            turn = "X";
            document.querySelector("#msg").textContent = "It's " + player1 + " Turn";
            // Xmoves++;
        }
    }
    // localStorage.setItem("player1", player1);
    // localStorage.setItem("player2", player2);
}
