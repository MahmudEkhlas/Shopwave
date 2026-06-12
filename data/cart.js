export const cart = [];

//adding to the cart

// function for adding the item to the cart
export function add_to_cart(pro_id) {
    let matching;

    cart.forEach((item) => {
        if (pro_id === item.productname) {
            matching = item;
        }
    });

    if (matching) {
        matching.quantity++;
    }

    else {
        cart.push({
            productid: pro_id,
            quantity: 1
        });
    }
}
