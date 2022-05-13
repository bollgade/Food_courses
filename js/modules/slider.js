import { getZero } from './timer';
import { deleteNotDigits } from './calc';

// Slider
function slider({ container, slide, nextArrow, previousArrow, totalCounter, currentCounter, wrapper, field }) {

  // Teacher's version 
  const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    prev = document.querySelector(previousArrow),
    next = document.querySelector(nextArrow),
    total = document.querySelector(totalCounter),
    current = document.querySelector(currentCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  total.textContent = getZero(slides.length);
  current.textContent = getZero(slideIndex);

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => {
    slide.style.width = width;
  });

  slider.style.position = 'relative';

  const indicators = document.createElement('ol'),
    dots = [];

  function updateDotsOpacity() {
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
  };

  indicators.classList.add('carousel-indicators');
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  next.addEventListener('click', () => {
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    current.textContent = getZero(slideIndex);

    updateDotsOpacity();
  });

  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = deleteNotDigits(width) * (slides.length - 1)
    } else {
      offset -= deleteNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    current.textContent = getZero(slideIndex);

    updateDotsOpacity();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1)

      slidesField.style.transform = `translateX(-${offset}px)`;

      current.textContent = getZero(slideIndex);

      updateDotsOpacity();
    })
  })

  /*My version for slider
     const slider = document.querySelector('.offer .offer__slider'),
        counter = slider.querySelector('.offer__slider-counter'),
        counterTotal = counter.querySelector('#total'),
        counterCurrent = counter.querySelector('#current'),
        prevSlide = counter.querySelector('.offer__slider-prev'),
        nextSlide = counter.querySelector('.offer__slider-next'),
        slides = slider.querySelectorAll('.offer__slide');
     function updateTotal(arr) {
        counterTotal.textContent = getZero(arr.length);
     };

     function updateCurrent(num) {
        counterCurrent.textContent = getZero(num);
     };

     function hideSlides() {
        slides.forEach(item => {
           item.classList.add('hide');
           item.classList.remove('show');
        });
     };

     function showSlide(arr, num = 0) {
        arr[num].classList.add('show');
        arr[num].classList.remove('hide');
        updateCurrent(num + 1);
     };

     function hideSlide(arr, num = 0) {
        arr[num].classList.remove('show');
        arr[num].classList.add('hide');
     };

     function whatShowed() {
        let num;
        slides.forEach((item, index) => {
           if (item.classList.contains('show')) {
              num = index;
           }
        });
        return num;
     };

     function showNextSlide(arr, num) {
        hideSlide(arr, num)
        num += 1;
        if (num > arr.length - 1) {
           num = 0;
        }
        showSlide(arr, num);
     }

     function showPrevSlide(arr, num) {
        hideSlide(arr, num)
        num -= 1;
        if (num < 0) {
           num = arr.length - 1;
        }
        showSlide(arr, num);
     }

     updateTotal(slides);
     hideSlides();
     showSlide(slides, 0);

     prevSlide.addEventListener('click', () => showPrevSlide(slides, whatShowed()));
     nextSlide.addEventListener('click', () => showNextSlide(slides, whatShowed()));
  */
};

export default slider;