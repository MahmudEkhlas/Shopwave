import { renderordersummary } from "./checkout/ordersummary.js";
import { renderpaymentsummary } from "./checkout/paymentsSummary.js";
import { renderCheckoutHeader } from "./checkout/checkHeader.js";
import { loadproducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/backend-practice.js'
// import "../data/cart-class.js";
// loadproducts(() => {
//     renderordersummary();
//     renderpaymentsummary();
//     renderCheckoutHeader();
// });

Promise.all([
    new Promise((resolve) => {
        loadproducts(() => {
            resolve();
        });
    }),
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