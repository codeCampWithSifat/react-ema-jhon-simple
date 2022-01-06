import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {
    const first20 = fakeData.slice(0,20);
    const [products , setProducts] = useState(first20);
    const [cart , setCart] = useState([]);
    const handleAddProducts = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
    }
    return (
        <div className='shop-container'>
           <div className="product-container">
                {
                    products.map(product => <Product handleAddProducts={handleAddProducts} product={product}></Product>)
                }
           </div>
           <div className="cart-container">
               <Cart cart={cart}></Cart>
           </div>
        </div>
    );
};

export default Shop;