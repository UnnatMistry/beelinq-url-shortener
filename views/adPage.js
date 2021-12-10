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

    
    
    document.getElementById("gobtn").innerHTML = `<button><a href="${url1}/uid=${id2}">Click here again</a></button>`
    // document.getElementById("gobtn").innerHTML = `<button><a href="/">Click here</a></button>`
}

function preventBack() { window.history.forward(); }  
setTimeout("preventBack()", 0);  
window.onunload = function () { null };  