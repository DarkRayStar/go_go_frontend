import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import "./storeAdmin.css";

function storeAdminDashboard() {
    return (
        <>
            <div className="container bkgrnd" style={{ maxWidth: "80%" }}>
                <h5 style={{ marginTop: '250px' }}>Welcome, NAME !</h5>
                <h4> Store Dashboard</h4>
                <div  className='container dshbrd' style={{ width: '80%' }}>
                    <Container >
                        <div >
                            <Row>
                                <Col style={{ marginTop: '250px' }}> <button type="button" class="btn btn-dark btn-lg"> View Items </button> </Col>
                                <Col style={{ marginTop: '300px' }}> <button type="button" class="btn btn-dark btn-lg"> Add Item </button> </Col>
                                <Col style={{ marginTop: '300px' }}> <button type="button" class="btn btn-dark btn-lg"> Generate Reports </button> </Col>
                            </Row>
                        </div>
                    </Container>
                </div>
            </div>


        </>
    )
}

export default storeAdminDashboard
