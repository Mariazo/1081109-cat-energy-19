var pageHeader = document.querySelector(".page-header");
var mainNav = document.querySelector(".main-nav");

pageHeader.classList.remove("page-header--no-js");
mainNav.classList.add("main-nav--mobile-close");

var menuElem = document.getElementById("menu");
var toggleElem = document.getElementById("menu-toggle");

toggleElem.onclick = function() {
  menuElem.classList.toggle("main-nav--mobile-close");
  toggleElem.classList.toggle("page-header__toggle--close");
};

function initComparisons() {
  var after = document.querySelector(".img-compare__after");
  var beforeImage = document.querySelector(".img-compare__before img");
  var slider = document.querySelector(".img-compare__slider");
  var progress = document.querySelector(".compare-info__progress");
  var clicked = 0;
  var w = 0;
  var h = 0;
  var progressWidth = 0;

  if (!after) {
    return;
  }

  init();

  /* Execute a function when the mouse button is pressed: */
  slider.addEventListener("mousedown", slideReady);
  /* And another function when the mouse button is released: */
  window.addEventListener("mouseup", slideFinish);
  /* Or touched (for touch screens: */
  slider.addEventListener("touchstart", slideReady);
  /* And released (for touch screens: */
  window.addEventListener("touchend", slideFinish);
  /* Execute a function when the slider is moved: */
  window.addEventListener("mousemove", slideMove);
  window.addEventListener("touchmove", slideMove);
  /** Reinit at resize */
  window.addEventListener("resize", init);

  function init() {
    after.removeAttribute("style");
    beforeImage.removeAttribute("style");
    slider.removeAttribute("style");
    progress.removeAttribute("style");

    /* Get the width and height of the img element */
    w = after.offsetWidth;
    h = after.offsetHeight;
    progressWidth = progress.offsetWidth - 2 * 6 - 1 * 2; // padding * 2 + border * 2
    /* Init before img */
    beforeImage.style.marginLeft = w / 2 + "px";
    beforeImage.style.width = w / 2 + "px";
    /* Set the width of the img element to 50%: */
    after.style.width = w / 2 + "px";
    /* Position the slider in the middle: */
    slider.style.left = w / 2 - slider.offsetWidth / 2 + "px";
    /* Position progress in the middle: */
    progress.style.paddingRight = Math.round(progressWidth / 2) + 6 + "px";
  }

  function slideFinish() {
    /* The slider is no longer clicked: */
    clicked = 0;
  }

  function slideReady(e) {
    /* Prevent any other actions that may occur when moving over the image: */
    e.preventDefault();
    /* The slider is now clicked and ready to move: */
    clicked = 1;
  }

  function slideMove(e) {
    var pos;
    /* If the slider is no longer clicked, exit this function: */
    if (clicked == 0) return false;
    /* Get the cursor's x position: */
    pos = getCursorPos(e);
    /* Prevent the slider from being positioned outside the image: */
    if (pos < 0) pos = 0;
    if (pos > w) pos = w;
    /* Execute a function that will resize the overlay image according to the cursor: */
    slide(pos);
  }

  function getCursorPos(e) {
    var a,
      x = 0;
    e = e || window.event;
    /* Get the x positions of the image: */
    a = after.getBoundingClientRect();
    // console.log("img", a, "e", e.pageX);
    /* Calculate the cursor's x coordinate, relative to the image: */
    x = (e.pageX || e.touches[0].pageX) - a.left;
    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    return x;
  }

  function slide(x) {
    /* Resize after image: */
    after.style.width = x + "px";
    /* Position the slider: */
    slider.style.left = after.offsetWidth - slider.offsetWidth / 2 + "px";
    /* Position before image: */
    beforeImage.style.width = w - x + "px";
    beforeImage.style.marginLeft = x + "px";
    /* Position progress: */
    progress.style.paddingRight =
      progressWidth + 6 - Math.round(progressWidth * (x / w)) + "px";
  }
}

initComparisons();
