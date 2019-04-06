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
            <li class="js-bookmark-element ${expanded}" data-item-id="${item.id}">        
            <h2 class="title-bar js-title-bar">${item.title}</h2>
                <div class="card">
                    <div class="bookmark-description">DESCRIPTION: ${item.desc}.</div>
                    <div class="bookmark-controls js-bookmark-controls">
                        <button class="url-visit js-url-visit card-button">
                            <span class="button-label">Visit</span>
                        </button>
                        <button class="bookmark-delete js-bookmark-delete card-button">
                            <span class="button-label">Delete</span>
                        </button>
                    </div>
                    <div class="star-rating js-star-rating">
                        ${sRating(item.rating)}
                    </div>
                </div>
            </li>`;
    }
        else {
            
            return `<li class="js-bookmark-element" data-item-id="${item.id}">
            <div class="mark">
                <h2 class="title-bar js-title-bar">${item.title}</h2>
                <div class="star-rating js-star-rating">
                ${sRating(item.rating)}
                </div>
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

        if (store.adding){
            $('#modal').attr('class','modal');
            $('#bookmark-add').attr('class','hidden');
            console.log('add true');
        }

        if (!store.adding){
            $('#modal').attr('class','modal hidden');
            $('#bookmark-add').attr('class','add-bookmark js-add-bookmark');
            
        }

        const bookmarksItemsString = generateBookmarksString(items);
        $('.js-bookmarks-list').html(bookmarksItemsString);
    }


    function getItemIdFromElement(item) {
        return $(item)
        .closest('.js-bookmark-element')
        .data('item-id');
    }

    function handleTitleClicked() {
        $('.js-bookmarks-list').on('click', '.js-title-bar', event => {
            
            // console.log('title was clicked');
            
            const id = getItemIdFromElement(event.currentTarget); 
            const item = store.findById(id);

            item.expanded = !item.expanded;
            
            // const checkObj = { checked: item.checked };
            // api.updateItem(id, checkObj);
            // store.findAndUpdate(id, checkObj);
            render();
        });
    }

    function handleAddClicked() {
        $('.container').on('click', '.js-add-bookmark', () => {
            store.adding = true;
            render();
    });
}

    function handleResetClicked(){
        $('.container').on('click', '.js-reset-minRate', event => {
            store.minRate = 0;
            console.log(store.minRate);
            render();
        });
}

    function handleStarFilterClicked() {
        $('.js-star-rating').on('click', '#star1', event => {
            store.minRate = 1;
            render();
        });
        $('.js-star-rating').on('click', '#star2', event => {
            store.minRate = 2;
            render();
        });
        $('.js-star-rating').on('click', '#star3', event => {
            store.minRate = 3;
            render();
        });
        $('.js-star-rating').on('click', '#star4', event => {
            store.minRate = 4;
            render();
        });
        $('.js-star-rating').on('click', '#star5', event => {
            store.minRate = 5;
            render();
        });
    }

    $.fn.extend({
        serializeJson: function() {
            const obj = {};
            const formData = new FormData(this[0]);
            formData.forEach((val,key) => {
                obj[key] = val;
            });
            return JSON.stringify(obj);
        }
    });

    function handleCreateClicked() {
        $('#js-bookmarks-form').submit(function(event) {
            event.preventDefault();
            const data = $(event.target).serializeJson();
            console.log(data);
            api.createItem(data)
            .then((newItem) => {
                store.addItem(newItem);
                document.getElementById("js-bookmarks-form").reset();
                store.adding = false;
                render();})
            .catch(error => 

                console.log(error));
            console.log('create ran');
            
        });
    }

    function handleModalCancel() {
        $('.modal-content').on('click','.js-modal-cancel-button', () => {
            store.adding = false;
            console.log('cancel was clicked');
            document.getElementById("js-bookmarks-form").reset();
            render();

        });

        // $('body').on('click','.modal', event => {
        //     event.target.closest()
        //     console.log(event.target);
        //     render();
        // });
    }

    function handleCardDelete() {
        $('.js-bookmarks-list').on('click', '.js-bookmark-delete', event => {
            const id = getItemIdFromElement(event.target);
            api.deleteItem(id)
            .then(() => {
                store.findAndDelete(id);
                render();
            })
            .catch(error => {
                console.log('error');
            });
            console.log('delete ran');
        });
    }

    function handleCardVisit() {
        $('.js-bookmarks-list').on('click', '.js-url-visit', event => {
            const id = getItemIdFromElement(event.target);
            let card = store.findById(id);
            window.open(`${card.url}`, '_blank');
            console.log(card.url);
        });
    }

    function bindEventListeners() {
        handleTitleClicked();
        handleAddClicked();
        handleResetClicked();
        handleStarFilterClicked();
        handleCreateClicked();
        handleModalCancel();
        handleCardDelete();
        handleCardVisit();
    }

    return {
    render:render,
    bindEventListeners: bindEventListeners,
    };

}());