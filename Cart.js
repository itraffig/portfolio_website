'use strict';
class Cart {
    constructor(productList) {
        this.productList = productList;
        this._init();
    }
    _init() {
        fetch(this.productList)
            .then(data => data.json())
            .then(data => {
                data.items.forEach(element => {
                    this._render(element);
                });
            })
    }
    _render(product) {
        document.getElementById('cart').innerHTML += `<div class="drop-menu__cart-item">
        <img src=${product.src} alt="product-box" class="drop-menu__cart-img">
        <div class="drop-menu__cart-info">
            <div>
                <p class="drop-menu__cart-name">Rebox Zane</p>
                <p class="drop-menu__cart-rating"><i class="fa-solid fa-star"></i><i
                        class="fa-solid fa-star"></i><i
                        class="fa-solid fa-star"></i><i
                        class="fa-solid fa-star"></i><i
                        class="fa-solid fa-star"></i></p>
                <p class="drop-menu__cart-price">${product.quantity} <span
                        class="drop-menu__cart-price_x_size">x</span> $${product.price}</p>
                        </div>
                        <a href="#" class="btn_del"><i class="fa-solid fa-circle-xmark"></i></a>
            
        </div>
    </div>`;
    };
}