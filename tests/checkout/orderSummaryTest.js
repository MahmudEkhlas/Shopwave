import { renderordersummary } from "../../script/checkout/ordersummary.js";
import { cart, loadfromstorage } from "../../data/cart.js";


describe('test suite: renderOrderSummary', () => {
    const prodId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const prodId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
    //runs the lines of code everytime before the starting of each test case
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        document.querySelector('.js-test-container').innerHTML = `
        <div class = "js-order-summary"></div>
        <div class = "js-payment-summary"></div>
        <div class="js-middle-section"></div>
        `;

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productid: prodId1,
                    quantity: 2,
                    deliveryOptionID: '1'
                },
                {
                    productid: prodId2,
                    quantity: 1,
                    deliveryOptionID: '2'
                }
            ]);
        });

        loadfromstorage();
        renderordersummary();
    });
    afterEach(() => {
        // removing the html that is no longer needed
        document.querySelector('.js-test-container').innerHTML = '';
    });

    it('displays the cart', () => {
        expect(document.querySelectorAll('.js-item-container').length).toEqual(2);
        expect(document.querySelector(`.js-product-quantity-${prodId1}`).innerText).toContain('Quantity: 2');
        expect(document.querySelector(`.js-product-quantity-${prodId2}`).innerText).toContain('Quantity: 1');
    });


    it('delete items in the cart', () => {

        document.querySelector(`.js-delete-link-${prodId1}`).click();
        expect(document.querySelectorAll('.js-item-container').length).toEqual(1);
        expect(document.querySelector(`.js-cart-item-container-${prodId1}`)).toEqual(null);
        expect(document.querySelector(`.js-cart-item-container-${prodId2}`)).not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].productid).toEqual(prodId2);
    });
});