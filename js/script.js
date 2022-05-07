'use strict'
window.addEventListener('DOMContentLoaded', () => {

   //Base variables
   const modal = document.querySelector('.modal');
   const modalTimerId = setTimeout(openModal, 50000);

   //Base functions
   function getZero(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      };
   };

   function openModal() {
      // modal.style.display = 'block';
      modal.classList.add('show');
      modal.classList.remove('hide');
      document.body.style.overflow = 'hidden';
      clearInterval(modalTimerId);
   };

   function closeModal() {
      // modal.style.display = 'none';
      modal.classList.add('hide');
      modal.classList.remove('show');
      // modal.classList.toggle('show');
      document.body.style.overflow = '';
   };

   const postData = async (url, data) => {
      const res = await fetch(url, {
         method: 'POST',
         headers: {
            'Content-type': 'application/json',
         },
         body: data,
      });

      return await res.json();
   };

   //Tabs
   (function () {
      const tabs = document.querySelectorAll('.tabheader__item'),
         tabsContent = document.querySelectorAll('.tabcontent'),
         tabsParent = document.querySelector('.tabheader__items');

      function hideTabContent() {
         tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
         });

         tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
         });
      };

      function showTabContent(i = 0) {
         tabsContent[i].classList.add('show', 'fade');
         tabsContent[i].classList.remove('hide');
         tabs[i].classList.add('tabheader__item_active');
      };

      hideTabContent();
      showTabContent();

      tabsParent.addEventListener('click', (event) => {
         const target = event.target;

         if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
               if (target == item) {
                  hideTabContent();
                  showTabContent(i);
               }
            });
         };
      });
   })();

   // Timer
   (function () {
      const deadLine = '2022-05-20T00:00:00'

      function getTimeRemaining(endtime) {
         const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);

         return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
         };
      };

      function setClock(selector, endtime) {
         const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

         updateClock();

         function updateClock() {
            const t = getTimeRemaining(endtime);

            if (t.total <= 0) {
               clearInterval(timeInterval);
               days.innerHTML = '00';
               hours.innerHTML = '00';
               minutes.innerHTML = '00';
               seconds.innerHTML = '00';
            } else {
               days.innerHTML = getZero(t.days);
               hours.innerHTML = getZero(t.hours);
               minutes.innerHTML = getZero(t.minutes);
               seconds.innerHTML = getZero(t.seconds);
            };

         };
      };

      setClock('.timer', deadLine);
   })();

   // Modal
   (function () {
      const modalTrigger = document.querySelectorAll('[data-modal]');

      // modalCloseBtn = document.querySelector('[data-close]');

      modalTrigger.forEach((btn) => {
         btn.addEventListener('click', openModal);
      });

      // modalCloseBtn.addEventListener('click', closeModal);

      modal.addEventListener('click', (e) => {
         if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
         }
      });

      document.addEventListener('keydown', (e) => {
         if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
         }
      });


      function showModalByScroll() {
         if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll)
         };
      }

      window.addEventListener('scroll', showModalByScroll);
   })();

   // Classes for Cards
   (function () {
      class MenuCard {
         constructor(src, alt, title, description, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = +price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector)/*.parentElement*/;
            this.transfer = 27;
            this.changeToUAH();
         }

         changeToUAH() {
            this.price = this.price * this.transfer
         }

         render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
               this.element = 'menu__item';
               element.classList.add(this.element);
            } else {
               this.classes.forEach(className => element.classList.add(className));
            };

            element.innerHTML = `
               <img src=${this.src} alt=${this.alt}>
               <h3 class="menu__item-subtitle">${this.title}</h3>
               <div class="menu__item-descr">${this.description}</div>
               <div class="menu__item-divider"></div>
               <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
               </div>
         `;

            /*Создание каждого элемента вручную, моя реализация*/
            // const img = document.createElement('img');
            // img.setAttribute('src', this.src);
            // img.setAttribute('alt', this.alt);

            // const subtitle = document.createElement('h3');;
            // subtitle.classList.add('menu__item-subtitle');
            // subtitle.textContent = this.title;

            // const description = document.createElement('div')
            // description.classList.add('menu__item-descr');
            // description.textContent = this.description;

            // const divider = document.createElement('div');
            // divider.classList.add('menu__item-divider');

            // const price = document.createElement('div');
            // const cost = document.createElement('div');
            // const total = document.createElement('div');
            // const num = document.createElement('span');
            // price.classList.add('menu__item-price');
            // cost.classList.add('menu__item-cost');
            // total.classList.add('menu__item-total');
            // cost.textContent = 'Цена:';
            // total.textContent = ' грн/день:';
            // num.textContent = this.price;
            // total.prepend(num);
            // price.append(cost, total);

            // element.append(img, subtitle, description, divider, price);

            this.parent.append(element);
         }
      };

      const getResource = async (url) => {
         const res = await fetch(url);

         if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
         }

         return await res.json();
      };

      const selector = '.menu .container';

      // Create Cards
      // getResource('http://localhost:3000/menu')
      //    .then(data => {
      //       data.forEach(({ img, altimg, title, descr, price }) => {
      //          new MenuCard(img, altimg, title, descr, price, selector).render();
      //       });
      //    });

      axios.get('http://localhost:3000/menu')
         .then(data => {
            data.data.forEach(({ img, altimg, title, descr, price }) => {
               new MenuCard(img, altimg, title, descr, price, selector).render();
            });
         });
   })();

   // Forms
   (function () {
      const forms = document.querySelectorAll('form');

      const message = {
         loading: './img/form/spinner.svg',
         success: 'Спасибо! Скоро мы с вами свяжемся',
         failure: 'Что-то пошло не так...',
      };

      forms.forEach(form => {
         bindPostData(form);
      });

      function bindPostData(form) {
         form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
         `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
               .then(data => {
                  console.log(data);
                  showThanksModal(message.success);
                  form.reset();
                  statusMessage.remove();
               }).catch(() => {
                  showThanksModal(message.failure);
               }).finally(() => {
                  form.reset();
               });

         });
      };

      function showThanksModal(message) {
         const prevModalDialog = document.querySelector('.modal__dialog');

         prevModalDialog.classList.add('hide');
         openModal();

         const thanksModal = document.createElement('div');
         thanksModal.classList.add('modal__dialog');
         thanksModal.innerHTML = `
         <div class="modal__content">
            <div data-close class="modal__close">×</div>
            <div class="modal__title">${message}</div>
         </div>
      `;

         document.querySelector('.modal').append(thanksModal);
         setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
         }, 4000);
      };
   })();

   // Offer__Slider
   (function () {
      // Teacher's version 
      const slides = document.querySelectorAll('.offer__slide'),
         slider = document.querySelector('.offer__slider'),
         prev = document.querySelector('.offer__slider-prev'),
         next = document.querySelector('.offer__slider-next'),
         total = document.querySelector('#total'),
         current = document.querySelector('#current'),
         slidesWrapper = document.querySelector('.offer__slider-wrapper'),
         slidesField = document.querySelector('.offer__slider-inner'),
         width = window.getComputedStyle(slidesWrapper).width;

      let slideIndex = 1;
      let offset = 0;

      if (slides.length < 10) {
         total.textContent = `0${slides.length}`;
         current.textContent = `0${slideIndex}`;
      } else {
         total.textContent = slides.length;
         current.textContent = slideIndex;
      };

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
         if (offset == +width.slice(0, (width.length - 2)) * (slides.length - 1)) {
            offset = 0;
         } else {
            offset += +width.slice(0, (width.length - 2));
         }

         slidesField.style.transform = `translateX(-${offset}px)`;

         if (slideIndex == slides.length) {
            slideIndex = 1;
         } else {
            slideIndex++;
         }

         /*Переписал его ошибку. Для правильной работы в условии должно быть "slideIndex", как мне кажется. 
         Он акцентировал внимание и сказал, что это здесь не важно. Но он не прав...*/
         if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
         } else {
            current.textContent = slideIndex;
         };

         dots.forEach(dot => dot.style.opacity = '.5');
         dots[slideIndex - 1].style.opacity = 1;
      });

      prev.addEventListener('click', () => {
         if (offset == 0) {
            offset = +width.slice(0, (width.length - 2)) * (slides.length - 1)
         } else {
            offset -= +width.slice(0, (width.length - 2));
         }

         slidesField.style.transform = `translateX(-${offset}px)`;

         if (slideIndex == 1) {
            slideIndex = slides.length;
         } else {
            slideIndex--;
         }

         if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
         } else {
            current.textContent = slideIndex;
         };

         dots.forEach(dot => dot.style.opacity = '.5');
         dots[slideIndex - 1].style.opacity = 1;
      });

      dots.forEach(dot => {
         dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.slice(0, (width.length - 2)) * (slideTo - 1)

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
               current.textContent = `0${slideIndex}`;
            } else {
               current.textContent = slideIndex;
            };

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;
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
   })();

});
