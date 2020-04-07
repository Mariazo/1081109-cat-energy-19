var menuElem = document.getElementById("menu");
var toggleElem = document.getElementById("menu-toggle");

toggleElem.onclick = function() {
  menuElem.classList.toggle("main-nav--mobile-close");
  toggleElem.classList.toggle("page-header__toggle--close");
};
