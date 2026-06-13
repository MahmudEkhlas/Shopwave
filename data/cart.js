//using Local Storage
export let cart = JSON.parse(localStorage.getItem('cart')) ||
    [
        {
            productid: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 1,
            deliveryOptionID: '1'
        },
        {
            productid: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionID: '1'
        }
    ];

//saving to local storage
function save_to_storage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

//adding to the cart

// function for adding the item to the cart
export function add_to_cart(pro_id) {
    let matching;

    cart.forEach((item) => {
        if (pro_id === item.productid) {
            matching = item;
        }
    });

    if (matching) {
        matching.quantity++;
    }

    else {
        cart.push({
            productid: pro_id,
            quantity: 1,
            deliveryOptionID: '1'
        });
    }
    save_to_storage();
}

export function remove_from_cart(productId) {
    const newcart = [];

    cart.forEach((cartitem) => {
        if (cartitem.id != productId) {
            newcart.push(cartitem)
        }
    });
    cart = newcart;
    save_to_storage();
}