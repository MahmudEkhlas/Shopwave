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



async function loadpage() {
    try {
        await loadproductsfetch();

        await new Promise((resolve,reject) => {
            //throw works till this level
            loadCart(() => {
                resolve();
                //throw keyword doesn't work inside the function that will take place in the future or the function that needed to be loaded in the future
                reject('error inside the function that has to run in future');
            });
        });
    } catch (error){
        console.log(error);
        
    }
    renderordersummary();
    renderpaymentsummary();
    renderCheckoutHeader();
}

loadpage();


/*Promise.all([
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
});*/

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