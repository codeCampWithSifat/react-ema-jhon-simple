import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
const Product = (props) => {
    // console.log(props);
    const { name, img, seller, price, stock,key } = props.product
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className='product-name'> <Link to ={`/product/${key}`}>{name}</Link></h4>
                <p><small>By : {seller}</small></p>
                <p>Price : {price}$</p>
                <p><small>Only Have  {stock} In Stock</small></p>
               {props.showAddToCart === true && <button onClick={() => props.handleAddProducts(props.product)} className='main-button'>
                <FontAwesomeIcon icon={faShoppingCart} /> Add To Cart
                </button>}
            </div>
        </div>
    );
};

export default Product;