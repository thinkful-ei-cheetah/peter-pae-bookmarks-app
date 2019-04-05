/* eslint-disable indent */
/* eslint-disable strict */
/* global $ */

const store = (function(){
    const addItem = function(item) {
        this.items.push(item);
        this.items[0].hidden = false;
        this.items[0].expanded = false;
        // console.log(this.items[0].expanded);
        // console.log(this.items[0].hidden);
    };

    const findById = function(id) {
        return this.items.find(item => item.id === id);
    };
    
    const findAndDelete = function(id) {
        this.items = this.items.filter(item => item.id !== id);
    };
    
    const findAndUpdate = function(id, newData) {
        // if ( validateName(id) )
        let item = this.findById(id);
        return Object.assign(item, newData);
        
    };

    return {
        items: [],
        adding: false,
        minRate: 0,
        
        addItem,
        findById,
        findAndDelete,
        findAndUpdate,
    };
}());