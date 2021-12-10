function changeBtn() {
 
    document.getElementById("gobtn").style.display = "block";
    document.getElementById("gobtn2").style.display = "none";

    // document.getElementById("gobtn").innerHTML = `<button><a href="/">Click here</a></button>`
}
// finalLink = document.getElementById("gobtn")
// document.getElementById("gobtn").innerHTML = "<button>Click on all ads to continue</button>"
// document.getElementById("gobtn").style.property =  display: none;
document.getElementById("gobtn").style.display = "none";

var div1IsClicked = false; // declare the variable that tracks the state
var div2IsClicked = false; // declare the variable that tracks the state
var div3IsClicked = false; // declare the variable that tracks the state

function div1clickHandler() { // declare a function that updates the state
    div1IsClicked = true;
}
function div2clickHandler() { // declare a function that updates the state
    div2IsClicked = true;
}
function div3clickHandler() { // declare a function that updates the state
    div3IsClicked = true;
}


var div1 = document.getElementById("div1");
var div2 = document.getElementById("div2");
var div3 = document.getElementById("div3");

div1.addEventListener("mouseover", div1clickHandler);
div2.addEventListener("mouseover", div2clickHandler);
div3.addEventListener("mouseover", div3clickHandler);


setInterval(() => {

    if(div1IsClicked==true && div2IsClicked==true && div3IsClicked==true){
        
        changeBtn()
    }
    console.log(finalLink)
}, 2000);


