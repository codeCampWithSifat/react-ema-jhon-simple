import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart , setCart] = useState([]);
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
    
    
    return (
        <div className="shop-container">
            <div className="product-container">
            {
                cart.map(pd => <ReviewItem 
                    removedProduct = {removedProduct}
                    key = {pd.key}
                    product = {pd}></ReviewItem>)
            }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button className="main-button">Palce Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;