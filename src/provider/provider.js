import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const AppContext = createContext();
const AppProvider = ({ children }) => {
    const [productData, setProductData] = useState([]);
    const [issuesdata, setIssueddata] = useState([]);
    useEffect(() => {
        const getDetails = async () => {
            try {
                const response = await fetch("https://guvi-hackathon2-backend-do9i.onrender.com", {
                    method: "GET"
                });
                const data = await response.json();
                const setdata =data.product
                setProductData(setdata)
            } catch (error) {
                console.log(error);
            }
        }
        getDetails();
    }, [])
    useEffect(() => {
        const getDetails = async () => {
            try {
                const response = await fetch("https://guvi-hackathon2-backend-do9i.onrender.com/cart/", {
                    method: "GET"
                });
                const data = await response.json();
                let setdata=data.carts;
                setIssueddata(setdata)
            } catch (error) {
                console.log(error);
            }
        }
        getDetails();
    }, [])


    return (
        <AppContext.Provider
            value={{
                productData,
                setProductData,
                issuesdata,
                setIssueddata
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
export const AppState = () => {
    return useContext(AppContext)
}
export default AppProvider
