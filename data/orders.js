export const orders=JSON.parse(localStorage.getItem('orders')) || [];

export function addorder(order){
    orders.unshift(order);
    saveorder();
}

function saveorder(){
    localStorage.setItem('orders',JSON.stringify(orders));
}