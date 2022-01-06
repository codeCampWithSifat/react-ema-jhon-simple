import React from 'react';

const Cart = (props) => {
    // console.log(props.cart)
    const cart = props.cart;
    const total = cart.reduce((total,prd) =>total + prd.price , 0);
    let shipping = 0 ;
    if (total > 35) {
        shipping = 0 ;
    } else if (total > 15) {
        shipping = 4.99;
    } else if (total > 0) {
        shipping = 12.99
    };

    const tax = (total/10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    function formatNumber (num) {
        const precision = num.toFixed(2);
        return Number(precision)
    }
    return (
        <div>
            <h3>Ordered Summary</h3>
            <p>Items Number : {cart.length}</p>
            <p>Product Price : {formatNumber(total)}</p>
            <p><small>Shipping Cost : {shipping}</small></p>
            <p>Tax + Vat : {tax}</p>
            <p>Total : {grandTotal}</p>
        </div>
    );
};

export default Cart;