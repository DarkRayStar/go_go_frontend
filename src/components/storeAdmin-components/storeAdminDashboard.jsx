import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import "./storeAdmin.css";

function storeAdminDashboard() {
    return (
        <>
            <div className="container bkgrnd" style={{ maxWidth: "80%" }}>
                <div className='container dshbrd' style={{ width: '80%' }}>
                    <Container>
                            {/* <div style={{marginTop: '300px'}}> */}
                        <Row>
                            <Col> <button type="button" class="btn btn-dark btn-lg"> View Items </button> </Col>
                            <Col> <button type="button" class="btn btn-dark btn-lg"> Add Item </button> </Col>
                            <Col> <button type="button" class="btn btn-dark btn-lg"> Generate Reports </button> </Col>
                            </Row>
                            {/* </div> */}
                    </Container>
                </div>
            </div>
        </>
    )
}

export default storeAdminDashboard
