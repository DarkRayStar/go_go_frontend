import React, { useEffect, useState } from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardImage,
    MDBCardTitle,
    MDBBtn
} from 'mdb-react-ui-kit';
// import { Row, Column } from 'react-foundation';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './itemDetails.scss'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";


function ItemDetails() {

    const id = window.sessionStorage.getItem('itemid');
    const [item, setItem] = useState([]);

    const getItem = async () => {
        try {
            const response = await axios.get("http://localhost:5050/storeAdmin/" + id);
            setItem(response.data);
        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        getItem();
    }, [])

    const goBack = () => {
        window.location="/userHome"
    }

    return (
        <div className='container'>
            <MDBCard className='item_card'>
                <Row>
                    <Col>
                    <Link onClick={goBack} to="#" className="backLink">
                    <FontAwesomeIcon style={{height:"30px"}} icon={faArrowAltCircleLeft} />
                    &nbsp;
                </Link>
                        <div className='item'>
                            <MDBCardImage className='item_image' src={item.images} alt='...' position='top' />
                        </div>
                    </Col>
                    <Col>
                        <MDBCardBody>
                            <MDBCardTitle className='item_title'>
                                {item.itemName}
                            </MDBCardTitle>
                            <hr></hr>
                            <MDBCardText>
                                <div className='item_des'>
                                    {item.description}
                                </div>
                            </MDBCardText>
                            <div>
                                <Row>
                                    <Col>
                                        <input className='item_quantity' type="number" /> 
                                    </Col>
                                    <Col >
                                        <div className='item_cart' >
                                        <MDBBtn className='item_btn'> Buy now </MDBBtn>
                                        </div>
                                    </Col>
                                    <Col>
                                        <MDBBtn className='item_btn'> Add to Cart</MDBBtn>
                                    </Col>
                                </Row>
                            </div>
                        </MDBCardBody>
                    </Col>
                </Row>
            </MDBCard>
            <Row style={{ marginBottom:"35px"}}>
                <Col>
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle>
                                Specifications
                            </MDBCardTitle>
                            <hr></hr>
                            <MDBCardText>
                                <div className='item_specifications'>
                                    {item.specifications}
                                </div>
                            </MDBCardText>
                        </MDBCardBody>

                    </MDBCard>
                </Col>
                <Col>
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle>
                                Reviews
                            </MDBCardTitle>
                            <hr></hr>
                            <MDBCardText>
                                <div className='item_specifications'>
                                    Some quick example text to build on the card title and make up the bulk of the card's content.
                                </div>
                            </MDBCardText>
                        </MDBCardBody>

                    </MDBCard>
                </Col>
            </Row>
        </div>
    )
}

export default ItemDetails
