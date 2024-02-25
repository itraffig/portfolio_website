'use strict';

class PopupMenu{
    /**
     * 
     * @param {string} clickEl id эелемента по клику на который появляется меню.
     * @param {string} showEl id элемента которому добавляется класс видимости блока.
     * @param {string} toggleCl название класса с display: flex.
     */
    constructor(clickEl, showEl, toggleCl){
        this.clickEl = this._getElement(clickEl);
        this.showEl = this._getElement(showEl);
        this.toggleCl = toggleCl;
        this._init();
    }
/**
 * Метод находит по id эелемент.
 * @param {string} id id элемента.
 * @returns {HTMLElement} возвращает найденный по id элемент.
 */
    _getElement(id){
        return document.getElementById(id);
    }
    /**
     * Метод добавляет слушатель события по клику.
     */
    _init(){
        this.clickEl.addEventListener('click', () => {
            this.showEl.classList.toggle(this.toggleCl);
        });
    }
}