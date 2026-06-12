export const cart = [
    {
        productid: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:1
    },
    {
        productid:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:1
    }
];

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
