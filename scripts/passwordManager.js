function showDiv() {
    document.getElementById("div").style.display = "";
}
function closeDiv() {
    document.getElementById("div").style.display = "none";
}

function closeOK() {
    document.getElementById("saved").style.display = "none";
}
const element = document.getElementById("saveBtn");

element.addEventListener("click", function () {
    document.getElementById("div").style.display = "none";
    document.getElementById("saved").style.display = "";
});