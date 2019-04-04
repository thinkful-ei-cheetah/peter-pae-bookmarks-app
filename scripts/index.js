/* eslint-disable strict */
// $(document).ready(function() {


//     api.getIte
// });


// console.log(api.getItems());


api.getItems()
    //.then(res => res.json())
    .then((items) => {
    items.forEach((item) => store.addItem(item));
    });






// const item = { title: "Yahoo", url: "http://yahoo.com" , rating : "2"};

console.log(store.items);

// store.findAndDelete(item);

// console.log(store.items);