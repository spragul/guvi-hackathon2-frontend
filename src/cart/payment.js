import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, {useState } from 'react';
import { AppState } from '../provider/provider';
import { useParams } from 'react-router-dom';
import Sidebar from '../sidebar/sidebar';
import { mainurl } from '../App';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

function PaymentApp() {
	const [loading, setLoading] = useState(false);
	const { productData,issuesdata,setIssueddata } = AppState();;
	const {productid,cartid } = useParams();
	const productDatas =  productData.find((bk) => bk._id === productid);
	const amountvalue =issuesdata.find((is) => is._id === cartid);
	const [orderAmount, setOrderAmount] = useState(amountvalue.price);
	const myid=sessionStorage.getItem('myid');
	const history=useHistory();
	const token=sessionStorage.getItem('token');

	//delete cart
	async function deletecart(id){
        try {
            const response = await fetch(`${mainurl}/cart/delete/${id}`, {
                method: "Delete",
				headers:{'Authorization': `Bearer ${token}`}
              })
              const data = await response.json();
            //   console.log(data);
              const productAlterList = issuesdata.filter((bk) => bk._id !== id);
              setIssueddata(productAlterList)
              toast("Removed cart item successful!");
        } catch (error) {
            console.log(error);
			alert(error);
        }

    }

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
					amount: orderAmount + '00'
				},{ headers: {"Authorization" : `Bearer ${token}`}});
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
							product:productDatas,
							userId:myid,
							amount: amount,
							razorpayPaymentId: response.razorpay_payment_id,
							razorpayOrderId: response.razorpay_order_id,
							razorpaySignature: response.razorpay_signature,
						},{ headers: {"Authorization" : `Bearer ${token}`}});
						alert(result.data.msg);
						if(result.data.rd===true){
						deletecart(cartid);
						history.push('/myorders');
						}
					},
					prefill: {
						name: 'example name',
						email: 'email@example.com',
						contact: '1111',
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

		</div>
		</Sidebar>
	);
}

export default PaymentApp;
