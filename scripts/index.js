/* eslint-disable indent */
/* eslint-disable strict */


$(document).ready(function() {

bookmarksList.bindEventListeners();

api.getItems()
  //.then(res => res.json())
    .then((items) => {
    items.forEach((item) => store.addItem(item));
    if($(window).width()>640){
      store.items.forEach(item => item.expanded = true);
    }
    bookmarksList.render();
    });
    
});



// const item = { title: "Yahoo", url: "http://yahoo.com" , rating : "2"};
// store.items[3].expanded = true;
// bookmarksList.render();
console.log(store.items);

// store.findAndDelete(item);

// console.log(store.items);