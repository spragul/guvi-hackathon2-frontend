import { useHistory } from "react-router-dom";
import { AppState } from "../provider/provider"
import Sidebar from "../sidebar/sidebar";
import { mainurl } from "../App";
import { toast } from "react-toastify";


export function RentalCart() {
    const { issuesdata, setIssueddata } = AppState();
    const history = useHistory();
    const token=sessionStorage.getItem('token');
    //delete cart details3
    async function deletecart(id) {
        try {
            const response = await fetch(`${mainurl}/cart/delete/${id}`, {
                method: "Delete",
             headers: {"Authorization" : `Bearer ${token}`}})
            const data = await response.json();
            console.log(data);
            const productAlterList = issuesdata.filter((bk) => bk._id !== id);
            setIssueddata(productAlterList)
            toast(data.message);
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <Sidebar>
            <div style={{   backgroundColor: "#25bcff" }}>
                <div className="cart-condinar">
                    {issuesdata.map((productDatas, index) => (
                        <div key={index} className="cart-card">
                            <h3>{productDatas.productName}</h3>
                            <p style={{ margin: "0px" }}>Starting Date: {productDatas.startingDate}</p>
                            <p style={{ margin: "0px" }}>Ending Date: {productDatas.endingDate}</p>
                            <p style={{ margin: "0px" }}>Price: {productDatas.price}</p>
                            <p style={{ fontSize: "15px" }}>id: {productDatas._id}</p>
                            <button className="cart-btn"
                                style={{ borderRadius: "10px", backgroundColor: "gold" }}
                                onClick={() => history.push(`/rentalpay/payment/${productDatas.productId}/${productDatas._id}`)}
                            >Rental Pay</button>
                            <button className="cart-btn"
                                style={{ borderRadius: "10px", backgroundColor: "gold" }}
                                onClick={() => deletecart(productDatas._id)}
                            >Delete item</button>
                        </div>
                    ))
                    }
                </div>
            </div>
        </Sidebar>
    )
}