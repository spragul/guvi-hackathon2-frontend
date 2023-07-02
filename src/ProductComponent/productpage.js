import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppState } from '../provider/provider';
import Sidebar from "../sidebar/sidebar";
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function ListOfProduct() {
    const { productData } = AppState();
    console.log(productData)
    const history = useHistory();
    const [search, setSearch] = useState('');
    const MyRole = sessionStorage.getItem('myRole');
    return (
        <Sidebar>
            <div className='book-condinar'>
                <Form>
                    <InputGroup className='my-3'>

                        {/* onChange for search */}
                        <Form.Control
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder='Search product Name'
                        />
                    </InputGroup>
                </Form>
            </div>

            <div className='book-condinar'>
                {
                    productData
                        .filter((item) => {
                            return search.toLowerCase() === ''
                                ? item
                                : item.productName.toLowerCase().includes(search.toLowerCase());
                        }).map((productDatas, index) => (
                            <div key={index} className="book-card">
                                <h3>{productDatas.productName}</h3>
                                <img src={productDatas.image} alt={productDatas.productName} title={productDatas.productName} className="image"></img>
                                <p style={{ margin: "0px" }}><span style={{ color: "blue" }}>model:</span>{productDatas.model}</p>
                                <p style={{ margin: "0px" }}><span style={{ color: "blue" }}>Categories:</span>{productDatas.categories}</p>
                                <p style={{ margin: "0px" }}><span style={{ color: "blue" }}>Price:</span>{productDatas.price}/hr</p>

                                <div className='btn-group'>


                                    <button
                                        className='button button-view'
                                        onClick={() => history.push(`/product/detail/${index}`)}
                                    >View Detail
                                    </button>
                                    { MyRole ==="user" ?
                                        <div>
                                            <button
                                                className='button button-view'
                                                onClick={() => history.push(`/cart/create/${productDatas._id}/${index}`)}
                                            >Add to cart
                                            </button>
                                        </div> :""
                                    }
                                </div>
                            </div>
                        ))
                }
            </div>
        </Sidebar>
    );
};

