function burgerNav() {
    document.getElementById("activate-burger-nav").onclick = function(){
        var burger = document.getElementById("burger-nav");
        burger.style.display = "block";
    }

    document.getElementById("close-burger").onclick = function(){
        var burger = document.getElementById("burger-nav");
        burger.style.display = "none";
    }
}