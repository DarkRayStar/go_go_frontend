import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

//customer
import ViewOneMovie from "./components/customer-components/view-movie-component";
import ViewCart from "./components/customer-components/view-cart-component";
import PaidPage from "./components/payment_components/paidPage";
import ViewFavItems from "./components/customer-components/view-fav-items-component";
import OrderHistory from "./components/customer-components/order-history-component";

//user management
import SignIn from "./components/userManagement-component/Login/login";
import ForgotPassword from "./components/userManagement-component/forgotPassword/forgotPassword";
import Registration from "./components/userManagement-component/Registration/registration";
import PasswordReset from "./components/userManagement-component/passwordReset/passwordReset";
import UserProfile from "./components/userManagement-component/profile/profile";

import adminRetrieve from './components/admin-components/admin-retrieve';
import adminInsert from './components/admin-components/admin-insert';
import adminUpdate from './components/admin-components/admin-update';
import HomePage from './components/user-components/HomePage';
// import Navbar from './components/navbar.component';
import QrGencomponent from './components/admin-components/qr-gencomponent';

import successPage from "./components/payment_components/successPage";
import DeliveryDashboard from "./components/delivery-components/delivery-dashboard-component";
import PendingDeliveries from "./components/delivery-components/pending-deliveries-component";
import OngoingDeliveries from "./components/delivery-components/ongoing-deliveries-component";
import CompletedDeliveries from "./components/delivery-components/completed-deliveries-component";
import CancelledDeliveries from "./components/delivery-components/cancelled-deliveries-component";
import NewDelivery from "./components/delivery-components/create-new-delivery-component";
import UpdateDelivery from "./components/delivery-components/update-delivery-component";

//Storeadmin
import ItemRetrieve from "./components/storeAdmin-components/itemRetrieve-component";
import ItemInsert from "./components/storeAdmin-components/itemInsert-component";
import ItemUpdate from "./components/storeAdmin-components/updateItem-component";

<link rel="stylesheet" href="./" />;

function App() {
  return (
    <Router>
      <div>
        {/* user-Management-Routes */}
        <Route path="/login" component={SignIn} />
        <Route path="/registration" component={Registration} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/user-password-reset/:id/:token" component={PasswordReset} />
        <Route path="/user-profile/:id" component={UserProfile} />

        <Route path="/home" component={HomePage} />
        <Route path="/admin-retrieve" component={adminRetrieve} />
        <Route path="/admin-insert" component={adminInsert} />
        <Route path="/admin-update/:id" component={adminUpdate} />
        <Route path="/qrgen" component={QrGencomponent} />

        {/* Customer */}
        <Route path="/one-movie/view/:id" component={ViewOneMovie} />
        <Route path="/cart/view/" component={ViewCart} />
        <Route path='/fav/view/' component={ViewFavItems} />
        <Route path='/order-history' component={OrderHistory} />

        <Route path="/payment-success" component={successPage} />
        <Route path="/payment-paid" component={PaidPage} />

        <Route path="/delivery-home" component={DeliveryDashboard} />
        <Route path="/delivery-pending" component={PendingDeliveries} />
        <Route path="/delivery-ongoing" component={OngoingDeliveries} />
        <Route path="/delivery-completed" component={CompletedDeliveries} />
        <Route path="/delivery-cancelled" component={CancelledDeliveries} />
        <Route path="/delivery-new" component={NewDelivery} />
        <Route path="/delivery-update" component={UpdateDelivery} />

        {/* storeAdminroutes */}
        <Route path="/storeAdmin" component={ItemRetrieve} />
        <Route path="/storeAdmin1/insert" component={ItemInsert} />
        <Route path="/storeAdmin1/update/:id" component={ItemUpdate} />

      </div>
      {/* </div> */}
    </Router >
  );
}

export default App;
