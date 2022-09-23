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

function ViewCart() {

    const [cartItems, setCartItems] = useState([]);

    const getCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:5050/cart');
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
                                                                {cartItem.description}

                                                            </MDBTypography>
                                                            <MDBTypography tag="h6" className="text-black mb-0" style={{ paddingTop: "10px" }}>
                                                                <b>Rs. {cartItem.price}.00</b>

                                                            </MDBTypography>
                                                        </MDBCol>
                                                        <MDBCol md="3" lg="3" xl="2" className="d-flex align-items-center">

                                                            <MDBInput type="number" min="0" defaultValue={cartItem.quantity} size="sm" style={{ marginLeft: "50px" }}
                                                                onChange={async (e) => {
                                                                    try {
                                                                        const data = {
                                                                            quantity: e.target.value,
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
                                                                        if (response.status === 200) {
                                                                            // alert("Item  Quantity Updated!!!");
                                                                        }

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

                                                </div>
                                            ))}

                                            <center><button className='btn btn-secondary' style={{ marginBottom: "50px" }}>Proceed to Checkout</button></center>
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

// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import './viewMod.css';
// import './viewMovieStyles.css';

// const Movie = props => (
//     <tr>
//         <td>{props.movie.movieName}</td>
//         <td>{props.movie.producer}</td>
//         <td>{props.movie.year} </td>
//         <td>{props.movie.genre} </td>
//         <td>{props.movie.imdb} </td>
//         <td>{props.movie.theaterOpt} </td>
//         <td>{props.movie.quantity} </td>
//         <td>
//             <a href="#" onClick={() => { props.deleteItem(props.movie._id) }}>Remove</a>
//         </td>
//     </tr>
// )

// export default class ViewCart extends Component {
//     constructor(props) {
//         super(props);

//         this.deleteItem = this.deleteItem.bind(this)

//         this.state = {
//             movies: [],
//             checkoutMap: [],
//             items: [],
//             showCart: [],
//             // userId: JSON.parse(sessionStorage.getItem("loggeduser")).email,
//             // userId: "indika@gmail.com",
//             paidStatus: ''
//         };
//     }

//     async componentDidMount() {
//         await axios.get('http://localhost:5050/cart/')
//             .then(response => {
//                 this.setState({ movies: response.data })
//                 // console.log(this.state.movies);

//                 // window.sessionStorage.setItem("items", JSON.stringify(testArray));
//                 // var storedArray = JSON.parse(sessionStorage.getItem("items"));//no brackets

//                 var ticketInfo = '';
//                 var i = 0;
//                 for (i = 0; i < this.state.movies.length; i++) {
//                     if (this.state.movies[i].showOnCart === true &&
//                         this.state.movies[i].userId === this.state.userId &&
//                         this.state.movies[i].paidStatus === false) {
//                         this.state.showCart.push(this.state.movies[i]);

//                         ticketInfo = ticketInfo + 'Movie: '
//                             + this.state.movies[i].movieName + ' ' + ' Theater: '
//                             + this.state.movies[i].theaterOpt + ' ' + ' Tickets: '
//                             + this.state.movies[i].quantity + ' | ';
//                     }
//                 }
//                 ticketInfo = 'User: ' + JSON.parse(sessionStorage.getItem("loggeduser")).email + ' | ' + ticketInfo;

//                 //re-render setstate
//                 this.setState({ topic: response.data })
//                 window.sessionStorage.setItem('ticketInfo', ticketInfo);

//                 console.log(ticketInfo);

//                 // console.log(this.state.movies);
//                 console.log(this.state.showCart);

//                 sessionStorage.setItem('cart', JSON.stringify(this.state.movies));
//                 // console.log(sessionStorage.getItem('cart'));
//             })
//             .catch((error) => {
//                 console.log(error);
//             })
//     }

//     deleteItem(id) {

//         var ask = window.confirm("Are you sure you want to remove this movie from a cart?");
//         if (ask) {
//             window.alert("This movie was successfully removed.");

//             axios.delete('http://localhost:5050/cart/' + id)
//                 .then(response => { console.log(response.data) });
//             this.setState({
//                 showCart: this.state.showCart.filter(el => el._id !== id)
//             })

//             window.location.href = "/cart/view";
//         }
//         else
//             window.location.href = "/cart/view";
//     }

//     movieList() {
//         return this.state.showCart.map(currentmovie => {
//             return <Movie movie={currentmovie} deleteItem={this.deleteItem} key={currentmovie._id} />;
//         })
//     }

//     async onCheckout() {

//         await axios.get('http://localhost:5050/cart/')
//             .then(response => {
//                 this.setState({ checkoutMap: response.data })
//                 console.log(this.state.checkoutMap.length);

//                 // console.log(this.state.checkoutMap);
//             })
//             .then(() => {
//                 var i = 0;
//                 for (i = 0; i < this.state.showCart.length; i++) {
//                     // console.log(this.state.checkoutMap[i].movieName);
//                     this.state.items.push({ id: this.state.showCart[i].movieName + ' - ' + this.state.showCart[i].theaterOpt, quantity: this.state.showCart[i].quantity })
//                 }
//                 window.sessionStorage.setItem("checkout", JSON.stringify(this.state.showCart));
//                 console.log('items', this.state.items);
//             })

//             .catch((error) => {
//                 console.log(error);
//             })

//         await fetch("http://localhost:5050/checkout", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 items: this.state.items
//             }
//             )
//         })
//             .then(res => {
//                 if (res.ok) return res.json()
//                 return res.json().then(json => Promise.reject(json))
//             })
//             .then(({ url }) => {
//                 window.location = url
//             })
//             .catch(e => {
//                 console.error(e.error)
//             })
//     }

//     render() {
//         return (
//             <div style={{ paddingBottom: "350px" }}>
//                 <div className="headingModsForViewVcl" style={{ color: 'white' }}> Movie Cart  </div>
//                 <table className="table table-hover table-bordered table-light">
//                     <thead className="table-dark">
//                         <tr>
//                             <th>Movie name</th>
//                             <th>Producer</th>
//                             <th>Year</th>
//                             <th>Genre</th>
//                             <th>IMDB</th>
//                             <th>Theater Option</th>
//                             <th>Quantity</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {this.movieList()} <br />
//                     </tbody>
//                 </table>
//                 <div className="btnView">
//                     <button style={{ marginLeft: "550px" }} onClick={() => this.onCheckout()} >Checkout</button>
//                 </div>
//                 <div className="btnCancel">
//                     <Link to={"/home"}> <button style={{ marginLeft: "15px" }}>Back</button></Link>
//                 </div>
//             </div>
//         )
//     }
// }