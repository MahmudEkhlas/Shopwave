import { cart } from "../../data/cart.js";
import { getdeliveryoption } from "../../data/deliver_option.js";
import { getproduct } from "../../data/products.js";
import { format_currency } from "../utils/money.js";

export function renderpaymentsummary() {
  let totalprice = 0;
  let shippingcost = 0;
  let items = 0;
  cart.forEach((cartitem) => {
    const product = getproduct(cartitem.productid);
    totalprice += product.price * cartitem.quantity;
    const deliveryOption = getdeliveryoption(cartitem.deliveryOptionID);
    shippingcost += deliveryOption.delivery_cost;
    items += cartitem.quantity;
  });
  const totalbeforetax = shippingcost + totalprice;
  const tax = totalbeforetax * 0.1;
  const aftertax = totalbeforetax + tax;

  const paymentsSummaryhtml = `
    <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (${items}):</div>
          <div class="payment-summary-money">$${format_currency(totalprice)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${format_currency(shippingcost)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${format_currency(totalbeforetax)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${format_currency(tax)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${format_currency(aftertax)}</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>
    `;
  document.querySelector('.js-payment-summary').innerHTML = paymentsSummaryhtml;
  document.querySelector('.js-middle-section').innerHTML = `${items} - items`;
}