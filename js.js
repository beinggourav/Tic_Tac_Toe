

var blocks = document.querySelectorAll("td");
var startOver = document.querySelector("#b1");

startOver.addEventListener("click", function () {
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].textContent = "";
    }
});

/* using this keyword */
function change(){
    if (this.textContent === "") {
        this.textContent = "X";
    } else if (this.textContent === "X") {
        this.textContent = "O"
    } else {
        this.textContent = "";
    }
}
for (let i = 0; i <blocks.length; i++) {
    blocks[i].addEventListener('click', change);
    
}