import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AppState } from '../provider/provider';
import { useParams } from 'react-router-dom';
import Sidebar from '../sidebar/sidebar';
import { mainurl } from '../App';

function PaymentApp() {
	const [loading, setLoading] = useState(false);
	const [orders, setOrders] = useState([]);
	const { productData,issuesdata } = AppState();;
	const {productid,cartid } = useParams();
	const productDatas =  productData.find((bk) => bk._id === productid);
	const amountvalue =issuesdata.find((is) => is._id === cartid);
	const [orderAmount, setOrderAmount] = useState(amountvalue.price);
	async function fetchOrders() {
		const { data } = await axios.get(`${mainurl}/payment/list-orders`);
		setOrders(data);
	}
	useEffect(() => {
		fetchOrders();
	}, []);

	function loadRazorpay() {
		const script = document.createElement('script');
		script.src = 'https://checkout.razorpay.com/v1/checkout.js';
		script.onerror = () => {
			alert('Razorpay SDK failed to load. Are you online?');
		};
		script.onload = async () => {
			try {
				setLoading(true);
				const result = await axios.post(`${mainurl}/payment/create-order`, {
					amount: orderAmount + '00',
				});
				const { amount, id: order_id, currency } = result.data;
				const {
					data: { key: razorpayKey },
				} = await axios.get(`${mainurl}/payment/get-razorpay-key`);

				const options = {
					key: razorpayKey,
					amount: amount.toString(),
					currency: currency,
					name: 'Rental App',
					description: productDatas.productName+"rental pay",
					order_id: order_id,
					handler: async function (response) {
						const result = await axios.post(`${mainurl}/payment/pay-order`, {
							amount: amount,
							razorpayPaymentId: response.razorpay_payment_id,
							razorpayOrderId: response.razorpay_order_id,
							razorpaySignature: response.razorpay_signature,
						});
						alert(result.data.msg);
						fetchOrders();
					},
					prefill: {
						name: 'example name',
						email: 'email@example.com',
						contact: '111',
					},
					notes: {
						address: 'example address',
					},
					theme: {
						color: '#80c0f0',
					},
				};

				setLoading(false);
				const paymentObject = new window.Razorpay(options);
				paymentObject.open();
			} catch (err) {
				alert(err);
				setLoading(false);
			}
		};
		document.body.appendChild(script);
	}

	return (
		<Sidebar>
		<div className="App">
			<div className='issued-cart-container'>

				<div className="Detail-card">
					<h1 style={{ color: "darkgreen" }}>{productDatas.productName}</h1>
					<img style={{ width: "300px", height: "300px" }} src={productDatas.image} title={productDatas.productName} alt={productDatas.productName}></img>
					<p style={{ color: "blue", fontSize: "40px" }}>model:{productDatas.model}</p>
					<p style={{ fontSize: "30px" }}>categories: {productDatas.categories}</p>
					<p style={{ fontSize: "30px",color:"#ff00bc" }}>Total Price: {amountvalue.price}</p>
				</div>
			</div>
			<div>
				<h2 style={{color:"red"}}> Pay Order</h2>
				<label>
					Amount:{' '}
					<input
						placeholder="INR"
						type="number"
						value={orderAmount}
					></input>
				</label>

				<button disabled={loading} onClick={loadRazorpay}>
					Razorpay
				</button>
				{loading && <div>Loading...</div>}
			</div>
			<div className="list-orders">
				<h2>List Orders</h2>
				<table class="table table-dark">
					<thead>
						<tr>
							<th>ID</th>
							<th>AMOUNT</th>
							<th>ISPAID</th>
							<th>RAZORPAY</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((x) => (
							<tr key={x._id}>
								<td>{x._id}</td>
								<td>{x.amount / 100}</td>
								<td>{x.isPaid ? 'YES' : 'NO'}</td>
								<td>{x.razorpay.paymentId}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
		</Sidebar>
	);
}

export default PaymentApp;
