function copyLink() {
    /* Get the text field */

    let copyText = document.getElementById("myInput");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand("copy");

    document.getElementById("copybtn").innerText = "Copied"
    setTimeout(() => {
        window.history.go(-1);
        
    }, 500);

}