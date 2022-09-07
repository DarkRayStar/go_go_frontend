import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './item-cart.css';
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import { faCheckCircle, faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function OrderHistory() {

    const [cartItems, setCartItems] = useState([]);

    const getCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:5050/cart/history');
            setCartItems(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCartItems();
    }, [])

    //Remove Item from Cart
    const onDeleteItem = async (id) => {
        if (window.confirm('Are you sure, you want to delete the selected Item?')) {
            try {
                await axios({
                    method: 'DELETE',
                    url: `http://localhost:5050/cart/${id}`
                })
                alert("Selected Item is Removed !!")
                getCartItems()
            } catch (error) {
                alert(error)
            }
        }
    }

    //add to favorites
    const onAddItem = async (Image, ItemName, Description, Price) => {
        try {
            const item = {
                image: Image,
                itemName: ItemName,
                description: Description,
                price: Price,
            }

            const response = await axios.post("http://localhost:5050/favorites/add", item)

            if (response.status === 200) {
                alert("Item Added to the Favorites!!!");
            }

        } catch (error) {
            if (error.response.status === 409) {
                alert(error.response.data.message);
            }
            else
                alert(error);
        }
        return false
    }

    const total = (Price, Qty) => {
        return Price * Qty
    }
    return (
        <section className="h-100 h-custom">
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol size="11">
                        <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                            <MDBCardBody className="p-0">
                                <MDBRow className="g-0">
                                    <MDBCol lg="12">
                                        <div className="p-5">
                                            <div className="d-flex justify-content-between align-items-center mb-5">
                                                <MDBTypography className="mb-0 text-muted">
                                                    <Link to={"#"} className="backLink"><FontAwesomeIcon icon={faArrowAltCircleLeft} /> Go Back</Link>
                                                </MDBTypography>
                                                <MDBTypography tag="h1" className="fw-bold mb-0 text-black" style={{ marginLeft: "75px" }}>
                                                    Order History
                                                </MDBTypography>
                                                <MDBTypography className="mb-0 text-muted">
                                                    <button className='btn btn-info'>Ordered Report</button>
                                                </MDBTypography>

                                            </div>

                                            {cartItems.map(cartItem => (
                                                <div key={cartItem._id}>

                                                    <MDBRow style={{ marginTop: "25px" }}>
                                                        <MDBCol md="2" lg="2" xl="2" className="card-item" style={{ borderRadius: "10px 0px 0px 10px" }}>
                                                            <MDBCardImage
                                                                src={cartItem.images}
                                                                fluid className="rounded-3" alt="item image" style={{ width: "200px", height: "100px" }} />
                                                        </MDBCol>

                                                        <MDBCol md="3" lg="3" xl="10" className="card-item" style={{ borderRadius: "0px 10px 10px 0px" }}>

                                                            <MDBRow>
                                                                <MDBCol>
                                                                    <MDBTypography tag="h6" className="completedMod">
                                                                        Completed <FontAwesomeIcon icon={faCheckCircle} />
                                                                    </MDBTypography>
                                                                </MDBCol>

                                                                <MDBCol style={{ marginLeft: "505px" }}> Order date : 2022-09-02 </MDBCol>
                                                            </MDBRow>
                                                            <MDBRow>
                                                                <hr className='hrMod'></hr>
                                                            </MDBRow>
                                                            <MDBRow style={{ marginTop: "-20px" }}>
                                                                <MDBCol md="3" lg="3" xl="9">
                                                                    <MDBTypography tag="h6" className="titleMod">
                                                                        {cartItem.itemName}
                                                                    </MDBTypography>

                                                                    <MDBTypography tag="h6" className="priceMod" style={{ paddingTop: "10px" }}>
                                                                        Rs. {cartItem.price} x {cartItem.quantity}
                                                                    </MDBTypography>
                                                                </MDBCol>

                                                                <MDBCol>
                                                                    <MDBTypography tag="h6" >

                                                                        <div className='totalMod'> Total: Rs {total(cartItem.price, cartItem.quantity)}</div><br /><br />

                                                                        <Link to="#" onClick={() => onDeleteItem(cartItem._id)} className="RemoveBtnMod"> Remove </Link>
                                                                        <Link to="#" onClick={() => onAddItem(cartItem.images, cartItem.itemName, cartItem.description, cartItem.price)} className="ReviewBtn"> Add Review</Link>

                                                                    </MDBTypography>
                                                                </MDBCol>

                                                            </MDBRow>
                                                        </MDBCol>
                                                    </MDBRow>

                                                </div>
                                            ))}
                                        </div>
                                    </MDBCol>

                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    )
}

export default OrderHistory