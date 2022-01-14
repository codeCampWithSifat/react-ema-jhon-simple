import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif'
const Review = () => {
    const [cart , setCart] = useState([]);
    const [orderPalced , setOrderPlaced] = useState(false);
    const removedProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
        
    }
    useEffect(() => {
        // cart information 
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key]
            return product;
        })
        setCart(cartProducts)
        
    },[])

    const handlePlaceOrder = () => {
        setCart([])
        setOrderPlaced(true)
        processOrder();    
    }

    let thankYou ;
    if (orderPalced) {
        thankYou = <img src={happyImage} alt="" />
    }
    return (
        <div className="shop-container">
            <div className="product-container">
            {
                cart.map(pd => <ReviewItem 
                    removedProduct = {removedProduct}
                    key = {pd.key}
                    product = {pd}></ReviewItem>)
            }
            {thankYou}
            </div>
            
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="main-button">Palce Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;