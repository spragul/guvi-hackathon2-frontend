import axios from "axios";
import { mainurl } from "../App";
import { useEffect, useState } from "react";
import Sidebar from "../sidebar/sidebar";

export function OrderDetails() {
    const [orders, setOrders] = useState([]);
    const [orderadmin, setOrderadmin] = useState([]);
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('myRole');

    //two diffrent link used user/admin

    async function fetchOrders(id) {
        const { data } = await axios.get(`${mainurl}/payment/list-orders/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
        setOrders(data);
    }
    useEffect(() => {
        if (role === 'user') {
            const id = sessionStorage.getItem('myid');
            fetchOrders(id);
        }
    }, []);

    async function fetchOrdersadmin() {
        const { data } = await axios.get(`${mainurl}/payment/list-orders/`, { headers: { "Authorization": `Bearer ${token}` } });
        console.log('or',data);
        setOrderadmin(data);
    }
    useEffect(() => {
        if (role === 'admin') {
            fetchOrdersadmin();
        }

    }, []);

    return (
        <Sidebar>
            <div className="order-container" style={{ height: "100vh" }}>
                <div className="list-orders">
                    <h2>List Orders</h2>
                    <table class="table table-dark">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>AMOUNT</th>
                                <th>ISPAID</th>
                                <th>RAZORPAY ID</th>
                                <th>PRODUCT NAME</th>
                                <th>CATEGORIES</th>
                                <th>MODEL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {role === 'admin' ? <>{orderadmin.map((x) => (
                                <tr key={x._id}>
                                    <td>{x._id}</td>
                                    <td>{x.amount / 100}</td>
                                    <td>{x.isPaid ? 'YES' : 'NO'}</td>
                                    <td>{x.razorpay.paymentId}</td>
                                    <td>{x.product.productName}</td>
                                    <td>{x.product.categories}</td>
                                    <td>{x.product.model}</td>
                                </tr>
                            ))
                            }</> : <>{orders.map((x) => (
                                <tr key={x._id}>
                                    <td>{x._id}</td>
                                    <td>{x.amount / 100}</td>
                                    <td>{x.isPaid ? 'YES' : 'NO'}</td>
                                    <td>{x.razorpay.paymentId}</td>
                                    <td>{x.product.productName}</td>
                                    <td>{x.product.categories}</td>
                                    <td>{x.product.model}</td>
                                </tr>
                            ))
                            }</>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </Sidebar>
    )
}