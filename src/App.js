import React from 'react';
import { Route } from 'react-router-dom';
import DarkExample from './Admin/admin';
import './App.css';
import { AddProduct } from './ProductComponent/AddProduct';
import { ProductDetails } from './ProductComponent/productDetails';
import ListOfProduct from './ProductComponent/productpage';
import { EditProducts } from './ProductComponent/Editproduct';
import { Login } from './pages/login';
import { Signup } from './pages/signup';
import { Forgot } from './pages/forgotpass';
import { Reset } from './pages/resetpassword';
import { Cart } from './cart/cart';
import { RentalCart } from './cart/rentalcart';
import PaymentApp from './cart/payment';
import { Firstpage } from './pages/firstpage';
import { OrderDetails } from './orderDetails/orderdetails';
export const mainurl="https://guvi-hackathon2-backend-do9i.onrender.com"
// export const mainurl='http://localhost:9000'

function App() {
  const MyRole = sessionStorage.getItem('myRole')
  return (
    <div className="App">
      <Route exact path="/">
        <Firstpage/>
      </Route>
      <Route path="/dashboard">
        <ListOfProduct/>
      </Route>
        <Route path="/cart/create/:productId/:index">
          <Cart/>
        </Route>
        <Route path="/detail/cart">
          <RentalCart/>
        </Route>
        <Route path="/rentalpay/payment/:productid/:cartid">
          <PaymentApp/>
        </Route>

        <Route path="/product/detail/:id">
          <ProductDetails/>
        </Route  >
          
        <Route path="/add/product">
          <AddProduct/>
        </Route>  
        <Route path='/myorders'>
          <OrderDetails/>
        </Route>

        <Route path="/edit/product/:id">
          <EditProducts/>
        </Route>
        <Route path="/login">
        <Login/>
        </Route>
        <Route path="/signup">
         <Signup/>
        </Route>
        <Route path="/forgotpassword">
         <Forgot/>
        </Route>
        <Route path="/resetpassword">
         <Reset/>
        </Route>
        {MyRole==="admin" ? <Route path="/admin"><DarkExample/></Route> : ""}
    </div>
  );
}

export default App;