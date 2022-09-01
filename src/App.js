import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import ViewOneMovie from "./components/customer-components/view-movie-component";
import ViewCart from "./components/customer-components/view-cart-component";
import PaidPage from "./components/payment_components/paidPage";

//user management
import SignUp from "./components/userManagement-component/Registration/registration";
import SignIn from "./components/userManagement-component/Login/login";


import adminRetrieve from './components/admin-components/admin-retrieve';
import adminInsert from './components/admin-components/admin-insert';
import adminUpdate from './components/admin-components/admin-update';
import HomePage from './components/user-components/HomePage';
import Navbar from './components/navbar.component';
import QrGencomponent from './components/admin-components/qr-gencomponent';

import successPage from "./components/payment_components/successPage";

<link rel="stylesheet" href="./" />;

function App() {
  return (
    <Router>
      <div style={{
        backgroundImage: `url("https://img.freepik.com/free-photo/rows-red-seats-theater_53876-64710.jpg?t=st=1653584762~exp=1653585362~hmac=7d41cd4ebbbb62a68e83b36fec07daacff290ce05b89258592391b35c426e0dd&w=1060")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>


        {/* user-Management-Routes */}
        <Route path="/login" component={SignIn} />
        <Route path="/registration" component={SignUp} />


        <div>
          {/* <Navbar /> */}
          <div className="container" >

            <Route path="/home" component={HomePage} />
            <Route path="/admin-retrieve" component={adminRetrieve} />
            <Route path="/admin-insert" component={adminInsert} />
            <Route path="/admin-update/:id" component={adminUpdate} />
            <Route path="/qrgen" component={QrGencomponent} />

            <Route path="/one-movie/view/:id" component={ViewOneMovie} />
            <Route path="/cart/view/" component={ViewCart} />

            <Route path="/payment-success" component={successPage} />
            <Route path="/payment-paid" component={PaidPage} />

          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
