import { orders } from "../data/orders.js";
import { getproduct, loadproductsfetch } from "../data/products.js";
import { format_currency } from "./utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { cart, add_to_cart } from "../data/cart.js";

loadproductsfetch().then(() => {
  renderOrdersPage();
  updateCartQuantity();
});

function renderOrdersPage() {
  const ordersGrid = document.querySelector('.js-orders-grid');

  if (orders.length === 0) {
    ordersGrid.innerHTML = emptyOrdersHTML();
    return;
  }

  let ordersHTML = '';

  orders.forEach((order) => {
    const orderTime = dayjs(order.orderTime).format('MMMM D');
    const orderTotal = format_currency(order.totalCostCents);
    const orderProducts = order.products || [];

    let productsListHTML = '';

    orderProducts.forEach((product) => {
      const matchingProduct = getproduct(product.productId);

      if (!matchingProduct) return;

      const estimatedDelivery = dayjs(product.estimatedDeliveryTime).format('MMMM D');

      productsListHTML += `
        <div class="product-image-container">
          <img src="${matchingProduct.image}">
        </div>

        <div>
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${estimatedDelivery}
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again"
            data-product-id="${product.productId}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span>Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });

    if (productsListHTML === '') return;

    ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTime}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${orderTotal}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${productsListHTML}
        </div>
      </div>
    `;
  });

  ordersGrid.innerHTML = ordersHTML || emptyOrdersHTML();

  document.querySelectorAll('.js-buy-again').forEach((button) => {
    button.addEventListener('click', () => {
      add_to_cart(button.dataset.productId, 1);
      updateCartQuantity();

      button.innerHTML = '<img class="buy-again-icon" src="images/icons/checkmark.png"><span>Added</span>';
      setTimeout(() => {
        button.innerHTML = '<img class="buy-again-icon" src="images/icons/buy-again.png"><span>Buy it again</span>';
      }, 1000);
    });
  });
}

function emptyOrdersHTML() {
  return `
    <div class="empty-orders">
      <div class="empty-orders-title">No orders yet</div>
      <div class="empty-orders-message">
        When you place an order, it will appear here.
      </div>
      <a href="amazon.html">
        <button class="button-primary empty-orders-button">
          View products
        </button>
      </a>
    </div>
  `;
}

function updateCartQuantity() {
  let totalQuantity = 0;

  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });

  document.querySelector('.cart-quantity').innerHTML = totalQuantity;
}
