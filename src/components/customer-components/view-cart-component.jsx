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
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import { faArrowAltCircleLeft, faHeart, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from "sweetalert2";

function ViewCart() {

    const [cartItems, setCartItems] = useState([]);

    const getCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:5050/cart');
            setCartItems(response.data);
            // console.log("fffff", response.data);
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

    //total price calculation
    // const total = (Price, Qty) => {
    //     var tot = Price * Qty;
    //     return tot
    // }

    // const getTot = (ttl) => {
    //     return ttl;
    // }

    //final total
    const finalTotal = async () => {

        let object = [];
        let sum = 0;
        let iId = [];

        try {
            const response = await axios.get('http://localhost:5050/cart');
            object = response.data
            for (var i = 0; i < object.length; i++) {
                object[i]
                sum = sum + (object[i].price * object[i].orderedQuanity)
            }
            sessionStorage.setItem("totalPayemt", sum);

            for (var j = 0; j < object.length; j++) {
                object[j]
                if (object[j].orderedQuanity < object[j].quantity) {
                    iId.push(object[j]._id)
                    window.location = '/paymentOrder';
                } else {
                    alert(object[j].itemName + " is not available")
                    // Swal.fire({
                    //     icon: 'error',
                    //     title: 'Oops...',
                    //     text: object[j].itemName + " is not available"
                    // })
                    // window.location = '/cart/view/';
                }
            }
            sessionStorage.setItem('itemID', JSON.stringify(iId))

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section >
            <MDBContainer className="h-100" style={{ marginTop: "50px" }}>
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol size="12">
                        <MDBCard className="card-registration card-registration-2" >
                            <MDBCardBody className="p-0">
                                <MDBRow className="g-0">
                                    <MDBCol lg="12">
                                        <div className="p-5">
                                            <div >

                                                <MDBTypography >
                                                    <Link to={"#"} className="backLink"><FontAwesomeIcon icon={faArrowAltCircleLeft} /> Go Back</Link>
                                                </MDBTypography>
                                                <center>
                                                    <MDBTypography tag="h3" className="fw-bold mb-0 text-black" style={{ marginTop: "-50px" }}>
                                                        Shopping Cart
                                                    </MDBTypography>
                                                </center>
                                            </div>

                                            {cartItems.map(cartItem => (
                                                <div key={cartItem._id}>

                                                    <hr className="my-4" />

                                                    <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
                                                        <MDBCol md="2" lg="2" xl="2" >
                                                            <MDBCardImage
                                                                src={cartItem.images}
                                                                fluid className="rounded-3" alt="item image" />
                                                        </MDBCol>
                                                        <MDBCol md="3" lg="3" xl="5">
                                                            <MDBTypography tag="h6" className="text-muted">
                                                                {cartItem.itemName}

                                                            </MDBTypography>
                                                            <MDBTypography tag="h6" className="text-black mb-0">
                                                                {cartItem.description.slice(0, 200)}

                                                            </MDBTypography>
                                                            <MDBTypography tag="h6" className="text-black mb-0" style={{ paddingTop: "10px" }}>
                                                                <b>Rs. {cartItem.price}.00</b>

                                                            </MDBTypography>
                                                        </MDBCol>
                                                        <MDBCol md="3" lg="3" xl="2" className="d-flex align-items-center">

                                                            <MDBInput type="number" min="0" defaultValue={cartItem.orderedQuanity} size="sm" style={{ marginLeft: "50px" }}
                                                                onChange={async (e) => {
                                                                    try {
                                                                        const data = {
                                                                            orderedQuanity: e.target.value,
                                                                            quantity: cartItem.quantity,
                                                                            images: cartItem.images,
                                                                            itemName: cartItem.itemName,
                                                                            description: cartItem.description,
                                                                            price: cartItem.price,
                                                                            offers: cartItem.offers,
                                                                            showOnCart: true,
                                                                            paidStatus: false,
                                                                        }

                                                                        const response = await axios.post(`http://localhost:5050/cart/update/${cartItem._id}`, data)
                                                                        // console.log(, data);
                                                                        // if (response.status === 200) {
                                                                        //     var ttl = cartItem.price * data.orderedQuanity;
                                                                        //     console.log("TOT", ttl);
                                                                        //     return ttl;
                                                                        //     // alert("Item  Quantity Updated!!!");
                                                                        // }

                                                                    } catch (error) {
                                                                        alert(error);
                                                                    }
                                                                    return false
                                                                }}
                                                            />

                                                        </MDBCol>
                                                        <MDBCol style={{ marginLeft: "150px" }}>
                                                            <Link to="#" onClick={() => onDeleteItem(cartItem._id)} className="iconMod"><FontAwesomeIcon icon={faTrashCan} /></Link>
                                                        </MDBCol>
                                                        <MDBCol style={{ marginLeft: "-20px" }}>
                                                            <Link to="#" onClick={() => onAddItem(cartItem.images, cartItem.itemName, cartItem.description, cartItem.price)} className="iconFavMod"><FontAwesomeIcon icon={faHeart} /></Link>
                                                        </MDBCol>

                                                    </MDBRow>
                                                    {/* Total: Rs {total(cartItem.price, cartItem.orderedQuanity)} */}
                                                    {/* tot:{getTot()} */}
                                                </div>
                                            ))}

                                            <center><button onClick={() => finalTotal()} className='btn btn-secondary' style={{ marginBottom: "50px" }}>Proceed to Checkout</button ></center>
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

export default ViewCart
