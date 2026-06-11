import { cart } from "../data/cart.js";
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
            $${(prod.price / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
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

          <div class="added-to-cart">
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

//adding to the cart
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const pro_id = button.dataset.product_id;

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
    let total_quantity=0;

    cart.forEach((item) =>{
      total_quantity += item.quantity;
    });
    document.querySelector('.js-cart-quantity').innerHTML=total_quantity;
  });
});