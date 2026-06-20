import { renderordersummary } from "./checkout/ordersummary.js";
import { renderpaymentsummary } from "./checkout/paymentsSummary.js";
import { renderCheckoutHeader } from "./checkout/checkHeader.js";
import { loadproductsfetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/backend-practice.js'
// import "../data/cart-class.js";
// loadproducts(() => {
//     renderordersummary();
//     renderpaymentsummary();
//     renderCheckoutHeader();
// });

Promise.all([
    loadproductsfetch(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })
]).then(() => {
    renderordersummary();
    renderpaymentsummary();
    renderCheckoutHeader();
});

/*
new Promise((resolve) => {
    loadproducts(() => {
        resolve();
    });
}).then(() => {
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });
}).then(() => {
    renderordersummary();
    renderpaymentsummary();
    renderCheckoutHeader();
});*/