import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import "./storeAdmin.css";
import Grid from "@mui/material/Grid";

function storeAdminDashboard() {

    const viewItem = () => {
        window.location = "/storeAdmin"
    }

    return (
        <>
            <div className="container bkgrnd" style={{ maxWidth: "80%" }}>
                <hr></hr>
                <h5 style={{ marginTop: '100px' }}>Welcome, John !</h5>
                <h4 > Store Admin</h4>
                <div className='container dshbrd'>
                    {/* <Container >
                        <div >
                            <Row>
                                <Col style={{ marginTop: '150px' }}> <button onClick={viewItem} type="button" class="dshbtn btn btn-dark btn-lg"> View Items </button> </Col>
                                <Col style={{ marginTop: '150px' }}> <button type="button" class="dshbtn btn btn-dark btn-lg"> Add Item </button> </Col>
                                <Col style={{ marginTop: '150px' }}> <button type="button" class="dshbtn btn btn-dark btn-lg"> Generate Reports </button> </Col>
                            </Row>
                        </div>
                    </Container> */}
                    <Grid container sx={{ marginBottom: "2vh" }}>
                        <Grid item xs={12} sx={{ marginBottom: "7vh" }}>
                            <div style={{ paddingTop: "3vh" }}>
                                <h3 style={{ textAlign: "center",marginBottom: "80px" }}>
                                    Go Go Gadgets - Warehouse DASHBOARD
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
                                onClick={() => viewItem()}
                            >
                                View Items
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
                            >
                                Add Items
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
                            >
                                Generate Reports
                            </button>
                        </Grid>
                       
                    </Grid>
                </div>
            </div>


        </>
    )
}

export default storeAdminDashboard
