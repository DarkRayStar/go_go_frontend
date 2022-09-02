import React, { Fragment, useState } from "react";
import axios from "axios";
import Navbar from "../navbar.component";
import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import "./delivery-styles.css";

export default function UpdateDelivery() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

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
        class="previous"
      >
        &laquo; Previous
      </a>

      <div
        style={{
          display: "block",
          margin: "auto",
          width: "80%",
          backgroundColor: "rgb(207, 210, 207,0.5)",
          height: "520px",
          marginBottom: '50px'
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
                    required: true,
                    maxLength: 80,
                  })}
                  style={{ borderRadius: "5px", border: " solid 1px" }}
                />
              </Grid>
              <Grid item xs={3}>
                <label>State/Province : </label>
              </Grid>
              <Grid item xs={3}>
                <select
                  {...register("State/Province")}
                  style={{ borderRadius: "5px", border: " solid 1px" }}
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
                    required: true,
                    maxLength: 12,
                  })}
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
                />
              </Grid>
              <Grid item xs={3}>
                <label>Delivery Partner : </label>
              </Grid>
              <Grid item xs={3}>
                <select
                  {...register("Delivery Partner")}
                  style={{ borderRadius: "5px", border: " solid 1px" }}
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
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
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
                />
              </Grid>
              <Grid item xs={3}>
                <label>Address : </label>
              </Grid>
              <Grid item xs={3}>
                <textarea
                  style={{ borderRadius: "5px", border: " solid 1px" }}
                  {...register("Address", {})}
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
                />
              </Grid>
              <Grid item xs={3}>
                <label>District : </label>
              </Grid>
              <Grid item xs={3}>
                <select
                  {...register("District")}
                  style={{ borderRadius: "5px", border: " solid 1px" }}
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
                  class="button-33"
                  type="submit"
                  style={{ marginRight: "50px" }}
                >
                  UPDATE INFO
                </button>
                <button class="button-33">CANCEL</button>
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
