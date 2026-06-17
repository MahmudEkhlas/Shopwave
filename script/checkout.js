import { renderordersummary } from "./checkout/ordersummary.js";
import { renderpaymentsummary } from "./checkout/paymentsSummary.js";
import "../data/cart-class.js";
import { renderCheckoutHeader } from "./checkout/checkHeader.js";
renderordersummary();
renderpaymentsummary();
renderCheckoutHeader();