function Cart_creation(local_key) {
    const cart = {
        cartItems: undefined,
        loadfromstorage() {
            this.cartItems = JSON.parse(localStorage.getItem(local_key)) || [];
        },
        //saving to local storage
        save_to_storage() {
            localStorage.setItem(local_key, JSON.stringify(this.cartItems));
        },

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
        },
        remove_from_cart(productId) {
            const newcart = [];

            this.cartItems.forEach((cartitem) => {
                if (cartitem.productid != productId) {
                    newcart.push(cartitem)
                }
            });
            this.cartItems = newcart;
            this.save_to_storage();
        },

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

    };
    return cart;
}

const cart=Cart_creation('cart-oop');
cart.loadfromstorage();





