import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AppState } from '../provider/provider';
import Sidebar from "../sidebar/sidebar";
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { mainurl } from '../App';

export default function ListOfProduct() {
    const { productData,setProductData,setIssueddata } = AppState();
    const history = useHistory();
    const [search, setSearch] = useState('');
    const MyRole = sessionStorage.getItem('myRole');
    const token=sessionStorage.getItem('token');

    //product
    useEffect(() => {
        const getDetails = async () => {
            try {
                const headers = { 'Authorization': `Bearer ${token}` };
                const response = await fetch(`${mainurl}`,{ headers });
                const data = await response.json();
                const setdata =data.product
                // console.log(setdata);
                setProductData(setdata)
            } catch (error) {
                console.log(error);
            }
        }
        if(token){
        getDetails();
        }
    }, [])
//cart
    useEffect(() => {
        const id=sessionStorage.getItem('myid')
        const getDetails = async (id) => {
            try {
                const headers = { 'Authorization': `Bearer ${token}` };
                const response = await fetch(`${mainurl}/cart/${id}`, { headers });
                const data = await response.json();
                //  console.log(data);
                let setdata=data.carts;
                setIssueddata(setdata)
            } catch (error) {
                console.log(error);
            }
        }
        if(token){
            getDetails(id);
        }
    }, [])
    
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

