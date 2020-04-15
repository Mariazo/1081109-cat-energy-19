var paheHeader = document.querySelector(".page-header");
var mainNav = document.querySelector(".main-nav");

paheHeader.classList.remove("page-header--no-js");
mainNav.classList.add("main-nav--mobile-close");

var menuElem = document.getElementById("menu");
var toggleElem = document.getElementById("menu-toggle");

toggleElem.onclick = function() {
  menuElem.classList.toggle("main-nav--mobile-close");
  toggleElem.classList.toggle("page-header__toggle--close");
};
