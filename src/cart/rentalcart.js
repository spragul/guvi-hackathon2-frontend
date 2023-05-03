import { useHistory, useParams } from "react-router-dom";
import { AppState } from "../provider/provider"
import Sidebar from "../sidebar/sidebar";

export function RentalCart() {
    const { issuesdata } = AppState();
    const history = useHistory();
    const issuedpro = issuesdata;
    console.log(issuesdata)
    return (
        <Sidebar>
            <div className="book-condinar">
           { issuesdata.map((productDatas, index) => (
                        <div key={index} className="cart-card">
                            <h3>{productDatas.productName}</h3>
                            <p style={{ margin:"0px"}}>Starting Date: {productDatas.startingDate}</p>
                            <p style={{ margin:"0px"}}>Ending Date: {productDatas.endingDate}</p>
                            <p style={{ margin:"0px"}}>Price: {productDatas.price}</p>
                            <p style={{ fontSize: "15px"}}>id: {productDatas._id}</p>
                    <button
                        style={{ borderRadius: "10px", backgroundColor: "gold" }}
                        onClick={() => history.push(`/rentalpay/payment/${index}`)}
                    >Rental Pay</button>
                </div>
            ))
            }
            </div>
        </Sidebar>
    )
}