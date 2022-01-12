import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {
    const first20 = fakeData.slice(0, 20);
    const [products, setProducts] = useState(first20);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const previousCart = productKeys.map(pdKey => {
            const product = fakeData.find(pd => pd.key === pdKey);
            product.quantity = saveCart[pdKey];
            return product
        })
        setCart(previousCart)
    }, [])
    const handleAddProducts = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct]
        } else {
            product.quantity = 1;
            newCart = [...cart, product];
        }

        setCart(newCart);

        addToDatabaseCart(product.key, count);
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(product => <Product
                        key={product.key}
                        showAddToCart={true}
                        handleAddProducts={handleAddProducts}
                        product={product}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-button">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;