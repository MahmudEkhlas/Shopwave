import { cart, remove_from_cart, updatedeliveryOption, updateQuantity } from "../../data/cart.js"
import { product, getproduct } from "../../data/products.js"
import { format_currency } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { delivery_option, getdeliveryoption } from "../../data/deliver_option.js";
import { renderpaymentsummary } from "./paymentsSummary.js";
import { renderCheckoutHeader } from "./checkHeader.js";


export function renderordersummary() {

  let cartsummary_html = '';
  cart.forEach((cart_item) => {
    const productID = cart_item.productid;
    const matching_Product = getproduct(productID);

    const deliveryOption_id = cart_item.deliveryOptionID;

    const deliveryOption = getdeliveryoption(deliveryOption_id);

    const today = dayjs();
    const delivery_date = today.add(deliveryOption.delivery_time, 'days');
    const date_string = delivery_date.format('dddd, MMMM D');

    cartsummary_html += `<div class="cart-item-container js-item-container js-cart-item-container-${matching_Product.id}">
            <div class="delivery-date">
              Delivery date: ${date_string}
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
                <div class="product-quantity js-product-quantity-${matching_Product.id}">
                  <span>
                    Quantity: <span class="quantity-label">${cart_item.quantity}</span>
                  </span>
                      <span class="update-quantity-link link-primary js-update-link"  data-product-id="${matching_Product.id}">
                          Update
                      </span>
                      <input class="quantity-input js-quantity-input-${matching_Product.id}">
                      <span class="save-quantity-link link-primary js-save-link" data-product-id="${matching_Product.id}"">Save</span>
                      <span class="delete-quantity-link link-primary js-delete-cartlink js-delete-link-${matching_Product.id}" data-product_id="${matching_Product.id}">
                      Delete </span>
                </div>
              </div>
              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
              ${deliveryOptionHTML(matching_Product, cart_item)}
              </div>
            </div>
          </div>`
  });

  document.querySelector('.js-order-summary').innerHTML = cartsummary_html;

  //adding functionalities to the delete button in the the cart
  document.querySelectorAll('.js-delete-cartlink').forEach((link) => {
    link.addEventListener('click', () => {
      const pid = link.dataset.product_id;

      /*
      after deleting a product from the cart it deleted directly like thecontainer else you can call
      order summary function directly to update the page
      const container = document.querySelector(`.js-cart-item-container-${pid}`);
      container.remove();*/

      remove_from_cart(pid);
      renderCheckoutHeader();
      //updating the page after deleting
      renderordersummary();
      renderpaymentsummary();
    });
  });



  function deliveryOptionHTML(matching_Product, cartItem) {
    let delivery_html = '';
    delivery_option.forEach((delivery) => {
      const today = dayjs();
      const delivery_date = today.add(delivery.delivery_time, 'days');
      const date_string = delivery_date.format('dddd, MMMM D');
      const priceString = delivery.delivery_cost ? `$${format_currency(delivery.delivery_cost)} -` : 'FREE';
      const isChecked = delivery.id === cartItem.deliveryOptionID;
      delivery_html += `<div class="delivery-option js-delivery-option" 
    data-productid="${matching_Product.id}" data-deliveryid="${delivery.id}">
      <input type="radio" ${isChecked ? 'checked' : ''}
        class="delivery-option-input"
        name="delivery-option-${matching_Product.id}">
        <div>
          <div class="delivery-option-date">
            ${date_string}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
    </div>`;
    });
    return delivery_html;
  }

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productid, deliveryid } = element.dataset;
      updatedeliveryOption(productid, deliveryid);
      renderordersummary();
      renderpaymentsummary();
    });
  });

  document.querySelectorAll('.js-update-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.classList.add('is-editing-quantity');
      });
    });

     document.querySelectorAll('.js-save-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.classList.remove('is-editing-quantity');

        const quantityInput = document.querySelector(
          `.js-quantity-input-${productId}`
        );
        const newQuantity = Number(quantityInput.value);
        updateQuantity(productId, newQuantity);

        renderCheckoutHeader();
        renderordersummary();
        renderpaymentsummary();
      });
    });




}
