import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {
    const first20 = fakeData.slice(0,20);
    const [products , setProducts] = useState(first20);
    const handleAddProducts = (product) => {
        console.log("Product Added",product);
    }
    return (
        <div className='shop-container'>
           <div className="product-container">
           <h2>Number Of Products {products.length}</h2>
                {
                    products.map(product => <Product handleAddProducts={handleAddProducts} product={product}></Product>)
                }
           </div>
           <div className="cart-container">
               <h2>This is Cart</h2>
           </div>
        </div>
    );
};

export default Shop;