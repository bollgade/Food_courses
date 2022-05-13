import { getResource } from "../services/services";

function cards() {
  // Classes for Cards

  class MenuCard {
    constructor(src, alt, title, description, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.description = description;
      this.price = +price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector) /*.parentElement*/;
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

  const selector = '.menu .container';

  // Create Cards
  getResource('http://localhost:3000/menu')
    .then(data => {
      data.forEach(({ img, altimg, title, descr, price }) => {
        new MenuCard(img, altimg, title, descr, price, selector).render();
      });
    });

  // axios.get('http://localhost:3000/menu')
  //   .then(data => {
  //     data.data.forEach(({
  //       img,
  //       altimg,
  //       title,
  //       descr,
  //       price
  //     }) => {
  //       new MenuCard(img, altimg, title, descr, price, selector).render();
  //     });
  //   });

};

export default cards;