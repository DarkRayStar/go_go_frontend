import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

//customer
import ViewOneMovie from "./components/customer-components/view-movie-component";
import ViewCart from "./components/customer-components/view-cart-component";
import PaidPage from "./components/payment_components/paidPage";
import ViewFavItems from "./components/customer-components/view-fav-items-component";




//user management
import SignIn from "./components/userManagement-component/Login/login";
import ForgotPassword from "./components/userManagement-component/forgotPassword/forgotPassword";
import Registration from "./components/userManagement-component/Registration/registration";
import PasswordReset from "./components/userManagement-component/passwordReset/passwordReset";



import adminRetrieve from './components/admin-components/admin-retrieve';
import adminInsert from './components/admin-components/admin-insert';
import adminUpdate from './components/admin-components/admin-update';
import HomePage from './components/user-components/HomePage';
// import Navbar from './components/navbar.component';
import QrGencomponent from './components/admin-components/qr-gencomponent';

import successPage from "./components/payment_components/successPage";

<link rel="stylesheet" href="./" />;

function App() {
  return (
    <Router>

      <div style={{
        // backgroundImage: `url("https://media.istockphoto.com/photos/light-pink-and-purple-defocused-blurred-motion-abstract-background-picture-id1138288771?k=20&m=1138288771&s=170667a&w=0&h=L4OSlBIrwzPYhGJx88zofN7zvShPDCjhDAHZ0iRk_u0=")`,
        backgroundImage: `url("https://cdn.wallpapersafari.com/29/63/FBkusA.jpg")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>



        {/* user-Management-Routes */}
        <Route path="/login" component={SignIn} />
        <Route path="/registration" component={Registration} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/user-password-reset/:id/:token" component={PasswordReset} />


        <div>
          {/* <Navbar /> */}
          <div className="container" >

            <Route path="/home" component={HomePage} />
            <Route path="/admin-retrieve" component={adminRetrieve} />
            <Route path="/admin-insert" component={adminInsert} />
            <Route path="/admin-update/:id" component={adminUpdate} />
            <Route path="/qrgen" component={QrGencomponent} />

            {/* Customer */}
            <Route path="/one-movie/view/:id" component={ViewOneMovie} />
            <Route path="/cart/view/" component={ViewCart} />
            <Route path='/fav/view/' component={ViewFavItems} />

            <Route path="/payment-success" component={successPage} />
            <Route path="/payment-paid" component={PaidPage} />

          </div>
        </div>
      </div>
    </Router >
  );
}

export default App;
