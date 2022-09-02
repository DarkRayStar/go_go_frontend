import React, { Fragment, useCallback, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar.component";
import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import { useHistory } from "react-router-dom";
import "./delivery-styles.css";

export default function UpdateDelivery() {
  let history = useHistory();

  const [data, setData] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [landlineNo, setLandlineNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [zip, setZip] = useState("");
  const [service, setService] = useState("");
  const [trackingID, setTrackingID] = useState("");
  const [fee, setFee] = useState("");

  const deliveryID = sessionStorage.getItem("currentDeliveryUpdateID");

  const logResult = useCallback(() => {
    return 2 + 2;
  }, []); //logResult is memoized now.

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    const delivery = {
      customerName: customerName,
      mobileNumber: mobileNo,
      landlineNumber: landlineNo,
      email: email,
      address: address,
      district: district,
      province: province,
      zip: zip,
      service: service,
      trackingID: trackingID,
      fee: fee,
    };

    console.log(delivery);

    var answer = window.confirm(
      "You are about to update an existing delivery information. Do you want to proceed?"
    );
    if (answer) {
      axios
        .post(`http://localhost:5050/delivery/update/${deliveryID}`, delivery)
        .then((res) => console.log(res.data));

      window.location = "/delivery-ongoing";
    } else {
      window.location.reload(true);
    }
  };

  const cancelButton = () =>{
    window.location = '/delivery-update';
  }

  useEffect(() => {
    axios.get(`http://localhost:5050/delivery/${deliveryID}`).then((res) => {
      setData(res.data);
      setCustomerName(res.data.customerName);
      setMobileNo(res.data.mobileNumber);
      setLandlineNo(res.data.landlineNumber);
      setEmail(res.data.email);
      setAddress(res.data.address);
      setZip(res.data.zip);
      setService(res.data.service);
      setTrackingID(res.data.trackingID);
      setFee(res.data.fee);
      setProvince(res.data.province);
      setDistrict(res.data.district);
    });
  }, [logResult]);

  return (
    <div>
      <Navbar />

      <a
        style={{
          marginLeft: "10%",
          marginTop: "5vh",
          backgroundColor: "rgb(34, 139, 34, 0.5)",
          marginBottom: "5vh",
        }}
        href="#"
        className="previous"
        onClick={() => history.goBack()}
      >
        &laquo; GO BACK
      </a>

      <div
        style={{
          display: "block",
          margin: "auto",
          width: "80%",
          backgroundColor: "rgb(207, 210, 207,0.5)",
          height: "520px",
          marginBottom: "50px",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          CHANGE DELIVERY DETAILS
        </h3>
        <div
          style={{
            backgroundColor: "rgb(207, 210, 207,0.8)",
            marginLeft: "40px",
            marginRight: "40px",
            paddingBottom: "40px",
            paddingTop: "30px",
            borderRadius: "10px",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} sx={{ width: "80%", margin: "auto" }}>
              <Grid item xs={3}>
                <label>Customer Name : </label>
              </Grid>
              <Grid item xs={3}>
                <input
                  type="text"
                  placeholder="Customer Name"
                  {...register("Customer Name", {
                    maxLength: 80,
                  })}
                  style={{ borderRadius: "5px", border: " solid 1px" }}
                  onChange={(e) => setCustomerName(e.target.value)}
                  value={customerName}
                />
              </Grid>
              <Grid item xs={3}>
                <label>State/Province : </label>
              </Grid>
              <Grid item xs={3}>
                <select
                  {...register("State/Province")}
                  style={{ borderRadius: "5px", border: " solid 1px" }}
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                >
                  <option value="Central">Central</option>
                  <option value="North Central">North Central</option>
                  <option value="Northern">Northern</option>
                  <option value="Eastern">Eastern</option>
                  <option value="North Western">North Western</option>
                  <option value="Southern">Southern</option>
                  <option value="Uva">Uva</option>
                  <option value="Sabaragamuwa">Sabaragamuwa</option>
                  <option value="Western">Western</option>
                </select>
              </Grid>
              <Grid item xs={3}>
                <label>Mobile Number : </label>
              </Grid>
              <Grid item xs={3}>
                <input
                  style={{ borderRadius: "5px", border: " solid 1px" }}
                  type="tel"
                  placeholder="Mobile Number"
                  {...register("Mobile Number", {
                    maxLength: 12,
                  })}
                  onChange={(e) => setMobileNo(e.target.value)}
                  value={mobileNo}
                />
              </Grid>
              <Grid item xs={3}>
                <label>Postal/ZIP Code : </label>
              </Grid>
              <Grid item xs={3}>
                <input
                  style={{ borderRadius: "5px", border: " solid 1px" }}
                  type="text"
                  placeholder="Postal/Zip Code"
                  {...register("Postal/Zip Code", {})}
                  onChange={(e) => setZip(e.target.value)}
                  value={zip}
                />
              </Grid>
              <Grid item xs={3}>
                <label>Landline Number : </label>
              </Grid>
              <Grid item xs={3}>
                <input
                  style={{ borderRadius: "5px", border: " solid 1px" }}
                  type="tel"
                  placeholder="Landline Number"
                  {...register("Landline Number", {})}
                  onChange={(e) => setLandlineNo(e.target.value)}
                  value={landlineNo}
                />
              </Grid>
              <Grid item xs={3}>
                <label>Delivery Partner : </label>
              </Grid>
              <Grid item xs={3}>
                <select
                  {...register("Delivery Partner")}
                  style={{ borderRadius: "5px", border: " solid 1px" }}
                  onChange={(e) => setService(e.target.value)}
                  value={service}
                >
                  <option value="DOMEX">DOMEX</option>
                  <option value="PRONTO">PRONTO</option>
                  <option value="PROMPTXPRESS">PROMPTXPRESS</option>
                  <option value="FARDAR">FARDAR</option>
                  <option value="CERTIS">CERTIS</option>
                  <option value="ARAMEX">ARAMEX</option>
                  <option value="GRASSHOPPERS">GRASSHOPPERS</option>
                </select>
              </Grid>
              <Grid item xs={3}>
                <label>Email : </label>
              </Grid>
              <Grid item xs={3}>
                <input
                  style={{ borderRadius: "5px", border: " solid 1px" }}
                  type="text"
                  placeholder="Email"
                  {...register("Email", {
                    pattern: /^\S+@\S+$/i,
                  })}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Grid>
              <Grid item xs={3}>
                <label>Tracking ID : </label>
              </Grid>
              <Grid item xs={3}>
                <input
                  style={{ borderRadius: "5px", border: " solid 1px" }}
                  type="text"
                  placeholder="Tracking ID"
                  {...register("Tracking ID", {})}
                  onChange={(e) => setTrackingID(e.target.value)}
                  value={trackingID}
                />
              </Grid>
              <Grid item xs={3}>
                <label>Address : </label>
              </Grid>
              <Grid item xs={3}>
                <textarea
                  style={{ borderRadius: "5px", border: " solid 1px" }}
                  {...register("Address", {})}
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
              </Grid>
              <Grid item xs={3}>
                <label>Delivery Fee : </label>
              </Grid>
              <Grid item xs={3}>
                <input
                  style={{ borderRadius: "5px", border: " solid 1px" }}
                  type="text"
                  placeholder="Delivery Fee"
                  {...register("Delivery Fee", {})}
                  onChange={(e) => setFee(e.target.value)}
                  value={fee}
                />
              </Grid>
              <Grid item xs={3}>
                <label>District : </label>
              </Grid>
              <Grid item xs={3}>
                <select
                  {...register("District")}
                  style={{ borderRadius: "5px", border: " solid 1px" }}
                  onChange={(e) => setDistrict(e.target.value)}
                  value={district}
                >
                  <option value="Colombo">Colombo</option>
                  <option value="Gampaha">Gampaha</option>
                  <option value="Kalutara">Kalutara</option>
                  <option value="Kandy">Kandy</option>
                  <option value="Matale">Matale</option>
                  <option value="Nuwara Eliya">Nuwara Eliya</option>
                  <option value="Galle">Galle</option>
                  <option value="Matara">Matara</option>
                  <option value="Hambantota">Hambantota</option>
                  <option value="Jaffna">Jaffna</option>
                  <option value="Kilinochchi">Kilinochchi</option>
                  <option value="Mannar">Mannar</option>
                  <option value="Vavuniya">Vavuniya</option>
                  <option value="Mullaitivu">Mullaitivu</option>
                  <option value="Batticaloa">Batticaloa</option>
                  <option value="Ampara">Ampara</option>
                  <option value="Trincomalee">Trincomalee</option>
                  <option value="Kurunegala">Kurunegala</option>
                  <option value="Puttalam">Puttalam</option>
                  <option value="Anuradhapura">Anuradhapura</option>
                  <option value="Polonnaruwa">Polonnaruwa</option>
                  <option value="Badulla">Badulla</option>
                  <option value="Moneragala">Moneragala</option>
                  <option value="Ratnapura">Ratnapura</option>
                  <option value="Kegalle">Kegalle</option>
                </select>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "center" }}>
                <button
                  className="button-33"
                  type="submit"
                  style={{ marginRight: "50px" }}
                >
                  UPDATE INFO
                </button>
                <button
                  type="button"
                  className="button-33"
                  onClick={() => cancelButton()}
                >
                  CANCEL
                </button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "rgb(109, 112, 166,0.5)",
          height: "100px",
          marginTop: "20px",
        }}
      />
    </div>
  );
}
