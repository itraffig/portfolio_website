'use strict';

window.onload = () => {
    const browse = new PopupMenu('browse', 'browse-popup-menu', 'drop-menu_display_flex');
    const cart = new Cart('./JSON/products.json');
}