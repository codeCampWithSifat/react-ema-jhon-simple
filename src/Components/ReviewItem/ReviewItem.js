import React from 'react';

const ReviewItem = (props) => {
    // console.log(props);
    const {name,quantity, img,price,key} = props.product;

    const reviewItem = {
        borderBottom : "1px solid lightgray",
        marginBottom : "10px",
        paddingBottom : "10px",
        marginLeft : "150px"
    }
    return (
        <div style = {reviewItem}>
            <h4 className="product-name">{name}</h4>
            <img src={img} alt="" />
            <p>Quantity : {quantity}</p>
            <p>Price : {price}</p>
            <button 
             onClick={ () => props.removedProduct(key)}
             className="main-button">Remove Item\
             </button>
        </div>
    );
};

export default ReviewItem;