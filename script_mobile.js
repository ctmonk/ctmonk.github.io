
var menuButton = document.getElementById("menu-button");
var navMenu = document.getElementById("nav-menu");


var menuItems = document.querySelectorAll("#nav-menu li");
for (var i = 0; i < menuItems.length; i++) {
  menuItems[i].addEventListener("click", function() {
    // hide the menu
    document.querySelector("#nav-menu").style.display = "none";
  });
}

menuButton.addEventListener("click", function() {
  if (navMenu.style.display === "block") {
    navMenu.style.display = "none"
  } else {
    navMenu.style.display = "block";
  }
});

document.getElementById("menu-button").addEventListener("click", function(){
    document.getElementById("nav-menu").classList.toggle("active");
  document.getElementById("menu-button").classList.toggle("active");
});

window.smoothScroll = function(target) {
    var scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);

    var targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);

    scroll = function(c, a, b, i) {
        i++; if (i > 30) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function(){ scroll(c, a, b, i); }, 20);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}

