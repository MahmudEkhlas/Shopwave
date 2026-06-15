//using Local Storage
export let cart = JSON.parse(localStorage.getItem('cart')) ||
    [];

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
        if (cartitem.productid != productId) {
            newcart.push(cartitem)
        }
    });
    cart = newcart;
    save_to_storage();
}

export function updatedeliveryOption(productid, deliverOptionId) {
    let matching;

    cart.forEach((item) => {
        if (productid === item.productid) {
            matching = item;
        }
    });

    matching.deliveryOptionID = deliverOptionId;
    save_to_storage();
}