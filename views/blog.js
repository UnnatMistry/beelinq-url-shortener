function changeBtn() {
    let url1 = window.location.href;
    // console.log(url1);
    let id1 = url1.split("tagId=")
    // console.log(id1[1]);
    let id2 = id1[1]-9388492;
    // console.log(id2);
    // console.log(`${id1[0]}uid=${id2}`);
    console.log(`/uid=${id2}`);
    // document.getElementById("gobtn").innerHTML = `<button><a href="/uid=${id2}">Click here</a></button>`

    
    
    document.getElementById("gobtn").innerHTML = `<button><a href="${url1}/uid=${id2}" style="color: white;text-decoration:none">Click here</a></button>`
    // document.getElementById("gobtn").innerHTML = `<button><a href="/">Click here</a></button>`
}


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

    if(div1IsClicked==true && div2IsClicked==true && div3IsClicked==true ){
        
        changeBtn()
    }
}, 2000);

