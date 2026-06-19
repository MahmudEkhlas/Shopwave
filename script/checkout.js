import { renderordersummary } from "./checkout/ordersummary.js";
import { renderpaymentsummary } from "./checkout/paymentsSummary.js";
import { renderCheckoutHeader } from "./checkout/checkHeader.js";
import { loadproducts } from "../data/products.js";
// import '../data/backend-practice.js'
// import "../data/cart-class.js";
loadproducts(() => {
    renderordersummary();
    renderpaymentsummary();
    renderCheckoutHeader();
});
