"use strict";

// Debounce fctn
function debounce(func, wait = 30, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const sliderImages = document.querySelectorAll(".slide-in");
console.log(sliderImages);

function checkSlides(e) {
  sliderImages.forEach((sliderImage) => {
    // half the height of the current image to display the image when it's halfway

    const slideInAt =
      window.scrollY + window.innerHeight - sliderImage.height / 2;
    console.log(slideInAt);

    // find the bottom of the image from the window for when the image is scrolled past
    const imgBottom = sliderImage.offsetTop + sliderImage.height;
    console.log(imgBottom);

    //  half shown
    const isHalfShown = slideInAt > sliderImage.offsetTop;

    // not scrolled past
    const isNotScrolledPast = window.scrollY < imgBottom;

    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add("active");
    } else sliderImage.classList.remove("active");
  });
}

window.addEventListener("scroll", debounce(checkSlides));
