import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppState } from '../provider/provider';
import Sidebar from "../sidebar/sidebar";
import { useState } from 'react';

export default function ListOfProduct() {
    const { productData } = AppState();
    console.log(productData)
    const history = useHistory();


    return (
        <Sidebar>
            <div className='book-condinar'>
                {
                    productData.map((productDatas, index) => (
                        <div key={index} className="book-card">
                            <h3>{productDatas.productName}</h3>
                            <img src={productDatas.image} alt={productDatas.productName} title={productDatas.productName} className="image"></img>
                            <p style={{ margin: "0px" }}>{productDatas.model}</p>
                            <p style={{ margin: "0px" }}>{productDatas.categories}</p>
                            <p style={{ margin: "0px" }}>{productDatas.price}</p>
                            <p style={{ fontSize: "30px", margin: "0px" }}>id: {productDatas.id}</p>
                            <div className='btn-group'>


                                <button
                                    className='button button-view'
                                    onClick={() => history.push(`/product/detail/${index}`)}
                                >View Detail
                                </button>
                                <button
                                    className='button button-view'
                                    onClick={() => history.push(`/rentalpay/payment/${index}`)}
                                >Buy
                                </button>
                                <div>
                                    <button
                                        className='button button-view'
                                        onClick={() => history.push(`/cart/create/${productDatas._id}/${index}`)}
                                    >Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </Sidebar>
    );
};

