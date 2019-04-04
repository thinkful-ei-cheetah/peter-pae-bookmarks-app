/* eslint-disable indent */

/* global store, $, api */
/* eslint-disable strict */


const bookmarksList = (function() {

    function generateItemElement(item) {
        const expanded = item.expanded ? 'expanded' : '';
        const sRating = function(rating) {
            let star1, star2, star3, star4, star5;
            rating >= 1 ? star1 = '<span class="star-check">★</span>' : star1 = '<span class="star">★</span>';
            rating >= 2 ? star2 = '<span class="star-check">★</span>' : star2 = '<span class="star">★</span>';
            rating >= 3 ? star3 = '<span class="star-check">★</span>' : star3 = '<span class="star">★</span>';
            rating >= 4 ? star4 = '<span class="star-check">★</span>' : star4 = '<span class="star">★</span>';
            rating >= 5 ? star5 = '<span class="star-check">★</span>' : star5 = '<span class="star">★</span>';
            return `${star1}${star2}${star3}${star4}${star5}`;
        };
    
        if(expanded){
        return `
            <li class="js-item-element ${expanded}" data-item-id="${item.id}">        
            <h2 class="title-bar js-title-bar">${item.title}</h2>
                <div class="bookmark-description">DESCRIPTION: ${item.desc}.</div>
                <div class="bookmark-controls">
                    <button class="shopping-item-toggle js-item-toggle">
                        <span class="button-label">Visit</span>
                    </button>
                    <button class="shopping-item-delete js-item-delete">
                        <span class="button-label">Delete</span>
                    </button>
                </div>
                <div class="star-rating js-star-rating">
                    ${sRating(item.rating)}
                </div>
            </li>`;
    }
        else {
            
            return `<li class="js-bookmark-element">
            <h2 class="title-bar js-title-bar">${item.title}</h2>
            <div class="star-rating js-star-rating">
            ${sRating(item.rating)}
            </div>
        </li>`;
    }
    }

    function generateBookmarksString(shoppingList) {
        const items = shoppingList.map((item) => generateItemElement(item));
        return items.join('');
    }

    function render() {
        let items = [...store.items];
        if (store.minRate) {
            items = items.filter(item => item.rating >= store.minRate);
        }

        const bookmarksItemsString = generateBookmarksString(items);
        $('.js-bookmarks-list').html(bookmarksItemsString);
    }





    function bindEventListeners() {
        sRating();
    }

    return {
    render:render,
    bindEventListeners: bindEventListeners,
    };

}());