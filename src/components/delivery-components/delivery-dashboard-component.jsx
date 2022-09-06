import React, { useState } from "react";
import Navbar from "../navbar.component";
import Grid from "@mui/material/Grid";
import "./delivery-styles.css";

const DeliveryDashboard = () => {
  const [one, setOne] = useState("Hello Function Component!");

  const goToPending = () => {
    window.location = "/delivery-pending";
  };

  const goToNew = () => {
    window.location = "/delivery-new";
  };

  const goToOngoing = () => {
    window.location = "/delivery-ongoing";
  };

  const goToCompleted = () => {
    window.location = "/delivery-completed";
  };

  const goToCancelled = () => {
    window.location = "/delivery-cancelled";
  };

  const goToReport = () => {
    // window.location = "/delivery-pending";
  };

  return (
    <div>
      <Navbar />
      <div style={{ width: "90%", margin: 'auto', marginBottom: '50px' }}>
        <div style={{ marginTop: "20px" }}>
          <h4>Welcome, Delivery Admin!</h4>
        </div>
        <div style={{ marginTop: "5px" }}>
          <h3>DELIVERY MANAGER</h3>
        </div>
        <div
          style={{ backgroundColor: "rgb(207, 210, 207,0.5)", height: "60vh" }}
        >
          <Grid container sx={{ marginBottom: "2vh" }}>
            <Grid item xs={12} sx={{ marginBottom: "7vh" }}>
              <div style={{ paddingTop: "3vh" }}>
                <h3 style={{ textAlign: "center" }}>
                  Go Go Gadgets - DELIVERY DASHBOARD
                </h3>
              </div>
            </Grid>
            <Grid item xs={4}>
              <button
                className="buttonHome"
                style={{
                  margin: "0 auto",
                  display: "block",
                  height: "15vh",
                  width: "80%",
                  borderRadius: "70px",
                }}
                onClick={() => goToPending()}
              >
                PENDING DELIVERIES
              </button>
            </Grid>
            <Grid item xs={4}>
              <button
                className="buttonHome"
                style={{
                  margin: "0 auto",
                  display: "block",
                  height: "15vh",
                  width: "80%",
                  borderRadius: "70px",
                }}
                onClick={() => goToNew()}
              >
                CREATE A NEW DELIVERY
              </button>
            </Grid>
            <Grid item xs={4}>
              <button
                className="buttonHome"
                style={{
                  margin: "0 auto",
                  display: "block",
                  height: "15vh",
                  width: "80%",
                  borderRadius: "70px",
                }}
                onClick={() => goToOngoing()}
              >
                ONGOING DELIVERIES
              </button>
            </Grid>
            <Grid item xs={4} sx={{ marginTop: "5vh" }}>
              <button
                className="buttonHome"
                style={{
                  margin: "0 auto",
                  display: "block",
                  height: "15vh",
                  width: "80%",
                  borderRadius: "70px",
                }}
                onClick={() => goToCompleted()}
              >
                COMPLETED DELIVERIES
              </button>
            </Grid>
            <Grid item xs={4} sx={{ marginTop: "5vh" }}>
              <button
                className="buttonHome"
                style={{
                  margin: "0 auto",
                  display: "block",
                  height: "15vh",
                  width: "80%",
                  borderRadius: "70px",
                }}
                onClick={() => goToCancelled()}
              >
                CANCELLED DELIVERIES
              </button>
            </Grid>
            <Grid item xs={4} sx={{ marginTop: "5vh" }}>
              <button
                className="buttonHome"
                style={{
                  margin: "0 auto",
                  display: "block",
                  height: "15vh",
                  width: "80%",
                  borderRadius: "70px",
                }}
                onClick={() => goToReport()}
              >
                VIEW INSIGHTS
              </button>
            </Grid>
          </Grid>
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
};

export default DeliveryDashboard;
