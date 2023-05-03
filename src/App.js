import React from 'react';
import { Route } from 'react-router-dom';
import DarkExample from './Admin/admin';
import { ProductIssued } from './Admin/productissued';
import './App.css';
import { AddProduct } from './ProductComponent/AddProduct';
import { ProductDetails } from './ProductComponent/productDetails';
import ListOfProduct from './ProductComponent/productpage';
import { EditProducts } from './ProductComponent/Editproduct';
import { ListIssuedProduct } from './Admin/issudebook';
import { Login } from './pages/login';
import { Signup } from './pages/signup';
import { Forgot } from './pages/forgotpass';
import { Reset } from './pages/resetpassword';
import { Cart } from './cart/cart';
import { RentalCart } from './cart/rentalcart';
import PaymentApp from './cart/payment';







function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <ListOfProduct/>
      </Route>
        <Route path="/cart/create/:productId/:index">
          <Cart/>
        </Route>
        <Route path="/detail/cart">
          <RentalCart/>
        </Route>
        <Route path="/rentalpay/payment/:index">
          <PaymentApp/>
        </Route>

        <Route path="/product/detail/:id">
          <ProductDetails/>
        </Route  >
          
        <Route path="/add/product">
          <AddProduct/>
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
        
        <Route path="/admin">
          <DarkExample/>
        </Route>

        <Route path="/issued/product/:id">
          <ProductIssued/>
        </Route>
        <Route path="/product/issued">
          <ListIssuedProduct/>
        </Route>

  
    </div>
  );
}

export default App;