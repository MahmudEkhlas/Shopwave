class Cart {
    cartItems ;
    #local_key ;
    constructor(localkey) {
        this.#local_key = localkey;
        this.#loadfromstorage();
    }

    #loadfromstorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.local_key)) || [];
    }

    //saving to local storage
    save_to_storage() {
        localStorage.setItem(this.#local_key, JSON.stringify(this.cartItems));
    }

    // function for adding the item to the cart
    add_to_cart(pro_id, val) {
        let matching;

        this.cartItems.forEach((item) => {
            if (pro_id === item.productid) {
                matching = item;
            }
        });

        if (matching) {
            matching.quantity += val;
        }

        else {
            this.cartItems.push({
                productid: pro_id,
                quantity: val,
                deliveryOptionID: '1'
            });
        }
        this.save_to_storage();
    }
    remove_from_cart(productId) {
        const newcart = [];

        this.cartItems.forEach((cartitem) => {
            if (cartitem.productid != productId) {
                newcart.push(cartitem)
            }
        });
        this.cartItems = newcart;
        this.save_to_storage();
    }
    updatedeliveryOption(productid, deliverOptionId) {
        let matching;

        this.cartItems.forEach((item) => {
            if (productid === item.productid) {
                matching = item;
            }
        });

        matching.deliveryOptionID = deliverOptionId;
        this.save_to_storage();
    }
}


const cart = new Cart('cart-oop');
const businesscart = new Cart('cart-business');
console.log(cart);



