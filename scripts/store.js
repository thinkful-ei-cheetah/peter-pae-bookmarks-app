/* eslint-disable indent */
/* eslint-disable strict */
/* global $ */

const store = (function(){
    const addItem = function(item) {
        this.items.push(item);
    };

    const findById = function(id) {
        return this.items.find(item => item.id === id);
    };
    
    const findAndDelete = function(id) {
        this.items = this.items.filter(item => item.id !== id);
    };
    
    return {
        items: [],
        adding: false,
        minRate: 0,
        
        addItem,
        findById,
        findAndDelete,
    };
}());