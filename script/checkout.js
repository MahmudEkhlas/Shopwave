import { cart,remove_from_cart } from "../data/cart.js";
import { product } from "../data/products.js"
import { format_currency } from "./utils/money.js";
let cartsummary_html = '';

cart.forEach((cart_item) => {
    const productID = cart_item.productid;
    let matching_Product;

    product.forEach((pro_item) => {
        if (productID === pro_item.id) {
            matching_Product = pro_item;
        }
    });

    cartsummary_html += `<div class="cart-item-container">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matching_Product.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matching_Product.name}
                </div>
                <div class="product-price">
                  $${format_currency(matching_Product.price)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cart_item.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-cartlink" data-product_id="${matching_Product.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matching_Product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matching_Product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matching_Product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`
});

document.querySelector('.js-order-summary').innerHTML =cartsummary_html;

//adding functionalities to the delete button in the the cart
document.querySelectorAll('js-delete-cartlink').forEach((link) =>{
  link.addEventListener('click',()=>{
    const pid=link.dataset.product_id;
    remove_from_cart(pid);
  });
});