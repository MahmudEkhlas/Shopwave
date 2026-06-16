import { cart, add_to_cart } from "../data/cart.js";
import { product } from "../data/products.js"
import { format_currency } from "./utils/money.js";
let prodhtml = '';

product.forEach((prod) => {
  prodhtml += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${prod.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${prod.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${prod.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${prod.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${format_currency(prod.price)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${prod.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${prod.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product_id="${prod.id}">
            Add to Cart
          </button>
        </div>
    `;
});

document.querySelector('.js-products-grid').innerHTML = prodhtml;

//function for the updating total cart quantity in the front page
function update_cart() {
  let total_quantity = 0;

  cart.forEach((item) => {
    total_quantity += item.quantity;
  });
  document.querySelector('.js-cart-quantity').innerHTML = total_quantity;
}

let time_id;

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const pro_id = button.dataset.product_id;
    const quantity_select = document.querySelector(`.js-quantity-selector-${pro_id}`);
    const val = Number(quantity_select.value);
    add_to_cart(pro_id, val);
    update_cart();
    generateAddedhtml(pro_id);
  });
});


// for  'added' to be visible  on the page after clicking adda to cart button

function generateAddedhtml(pro_id) {
  const added_to = document.querySelector(`.js-added-to-cart-${pro_id}`);

  added_to.classList.add('added-to-cart-visible');

  if (time_id) {
    clearTimeout(time_id);
  }
  const timeID = setTimeout(() => {
    added_to.classList.remove('added-to-cart-visible');
  }, 2000);
  time_id = timeID;

}