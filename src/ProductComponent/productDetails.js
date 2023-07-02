import { useHistory, useParams } from "react-router-dom";
import { AppState } from "../provider/provider"
import Sidebar from "../sidebar/sidebar";

export function ProductDetails() {
    const { productData } = AppState();
    const { id } = useParams();
    console.log(id);
    const history = useHistory();
    const productDatas = productData[id];
    return (
        <Sidebar>
            <div className="book-detail-condinar">
                <div className="Detail-card">
                    <h1 style={{ color: "darkgreen" }}>{productDatas.productName}</h1>
                    <img style={{ width: "300px", height: "300px" }} src={productDatas.image} title={productDatas.productName} alt={productDatas.productName}></img>
                    <p style={{ color: "blue", fontSize: "40px" }}>model:{productDatas.model}</p>
                    <p style={{ fontSize: "30px" }}>categories: {productDatas.categories}</p>
                    <p style={{ fontSize: "30px" }}>price: {productDatas.price}</p>
                    
                    <button
                        style={{ borderRadius: "10px", backgroundColor: "gold" }}
                        onClick={() => history.push("/dashboard")}
                    >Product List</button>
                </div>

            </div>
        </Sidebar>
    )
}