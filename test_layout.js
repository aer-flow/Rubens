const img = document.querySelector('.about-img');
const track = document.querySelector('.h-scroll-track');
console.log('Img width:', img.getBoundingClientRect().width);
console.log('Track width:', track.getBoundingClientRect().width);
console.log('Track scrollWidth:', track.scrollWidth);
console.log('Track overflow-x:', getComputedStyle(track).overflowX);
