'use strict';

class Cart {
    /**
     * 
     * @param {string} srcJSON путь до JSON с товарами 
     * @param {string} idCart id элемента в котором находятся добавленные товары в корзину
     * @param {string} idTotal id элемента в котором находится общая сумма товаров
     * @param {string} clBtnBuy класс кнопок купить для добавления в корзину товаров
     */
    constructor(srcJSON, idCart = 'cart', idTotal = 'cart-price', clBtnBuy = 'product-box__btn-add-to-cart') {
        this.srcJSON = srcJSON;
        this.idCart = idCart;
        this.idTotal = idTotal;
        this.clBtnBuy = clBtnBuy;
        this.items = [];
        this.totalPrice = 0;
        this.quantityAll = 0;
        this._init();
    }
    /**
     * Инициализация работы корзины и событий по клику на кнопку купить.
     */
    _init() {
        fetch(this.srcJSON)
            .then(data => data.json())
            .then(data => {
                for (const item of data.items) {
                    this.items.push(item);
                    this._render(item);
                }
                this.totalPrice = data.priceAll;
                this.quantityAll = data.quantityAll;
                this._renderSum();
            });
        this._handlerBtn();
    }
    /**
     * Устанавливает обработчик событий на кнопки.
     */
    _handlerBtn() {
        const btnBuyAll = document.querySelectorAll(`.${this.clBtnBuy}`);
        if (btnBuyAll) {
            for (const btnBuy of btnBuyAll) {
                btnBuy.addEventListener('click', e => {
                    e.preventDefault();
                    this._addItemToCart(e.currentTarget);
                });
            }
        } else {
            return;
        }
    }
    /**
     * Метод  добавляет (рендерит) товар в корзину.
     * @param {Object} item объект с данными по одному товару для добавления (рендера) в корзину. 
     */
    _render(item) {
        let productEl = document.createElement('div');
        productEl.classList.add('drop-menu__cart-item');
        productEl.dataset.id = item.id;
        productEl.innerHTML = `<img src="${item.src}" alt="product-box" class="drop-menu__cart-img">`;
        let productInfoEl = document.createElement('div');
        productInfoEl.classList.add('drop-menu__cart-info');
        productInfoEl.innerHTML = `<div>
            <p class="drop-menu__cart-name">${item.name}</p>
            <p class="drop-menu__cart-rating"><i class="fa-solid fa-star"></i><i
                class="fa-solid fa-star"></i><i
                class="fa-solid fa-star"></i><i
                class="fa-solid fa-star"></i><i
                class="fa-solid fa-star"></i></p>
            <p class="drop-menu__cart-price">${item.quantity} <span class="drop-menu__cart-price_x_size">x</span> $${item.quantity * item.price}</p>
            </div>`;
        let btnRemove = document.createElement('a');
        btnRemove.href = '#';
        btnRemove.classList.add('drop-menu__cart-btn-remove')
        btnRemove.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`;
        btnRemove.addEventListener('click', (e) => {
            e.preventDefault();
            this._removeItem(productEl);
        });
        productInfoEl.appendChild(btnRemove);
        productEl.appendChild(productInfoEl);
        document.getElementById(this.idCart).appendChild(productEl);
    }
    /**
     * Метод отрисовывает (рендерит) общее количество товаров и сумму всех товаров.
     */
    _renderSum() {
        document.querySelector('.header__cart-quantity-all').textContent = `${this.quantityAll}`;
        document.getElementById(this.idTotal).textContent = `$${this.totalPrice}`;
    }
    /**
     * Метод удаляет 1 товар из корзины.
     * @param {HTMLDivElement} productEl элемент коллекции созданный при рендере товара
     */
    _removeItem(productEl) {
        let product = this.items.find(item => item.id === +productEl.dataset.id);
        if (product.quantity > 1) {
            product.quantity--;
            this._updateCart(product);
        } else {
            this.items.splice(this.items.indexOf(product), 1);
            productEl.remove();
        }
        this.quantityAll--;
        this.totalPrice -= product.price;
        this._renderSum();
    }
    /**
     * Метод обновляет (рендерит) информацию по количеству и сумме товара в корзине.
     * @param {HTMLDivElement} product элемент коллекции.
     */
    _updateCart(product) {
        document.querySelector(`[data-id="${product.id}"] .drop-menu__cart-price`)
            .innerHTML = `${product.quantity} <span class="drop-menu__cart-price_x_size">x</span> $${product.quantity * product.price}`;
    }
    /**
     * Метод добавляет товар в корзину
     * @param {HTMLAnchorElement} item элемент коллекции полученный при клике на кнопку купить 
     */
    _addItemToCart(item) {
        const idItem = +item.dataset.id;
        if (!isNaN(idItem)) {
            let productFind = this.items.find(product => product.id === idItem);
            if (productFind) {
                productFind.quantity++;
                this.quantityAll++;
                this.totalPrice += +productFind.price;
                this._updateCart(productFind);
            } else {
                const productNew = {
                    id: idItem,
                    name: item.dataset.name,
                    price: item.dataset.price,
                    quantity: 1,
                    src: item.dataset.src
                };
                this.items.push(productNew);
                this._render(productNew);
                this.quantityAll += +productNew.quantity;
                this.totalPrice += +productNew.price;
            }
        } else {
            return;
        }
        this._renderSum();
    }
}