function activateNav() {
    document.getElementById("activate-burger-nav").onclick = function(){
        var burger = document.getElementById("burger-nav");
        burger.style.display = "block";
        burger.style.display = "block";
    }
}

function init() {
    activateNav();
}

init();