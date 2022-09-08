// // import { Button } from 'bootstrap';
// import React, { useState } from 'react'
// // import { useForm } from "react-hook-form";
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';


// function ItemInsert() {

//     //state variables
//     var [itemName, setName] = useState();
//     var [description, setDescription] = useState();
//     var [price, setPrice] = useState();
//     var [quantity, setQuantity] = useState();
//     var [images, setImages] = useState();
//     var [offer, setOffer] = useState();

//     // Dealing with field changes to update state
//     const nameUpdate = (event) => {
//         setName(event.target.value)
//     }
//     const descriptionUpdate = (event) => {
//         setDescription(event.target.value)
//     }
//     const priceUpdate = (event) => {
//         setPrice(event.target.value)
//     }
//     const quantityUpdate = (event) => {
//         setQuantity(event.target.value)
//     }
//     const imagesUpdate = (event) => {
//         setImages(event.target.value)
//     }
//     const offerUpdate = (event) => {
//         setOffer(event.target.value)
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const postURL = "http://localhost:5050/storeAdmin/add"
//         fetch(postURL, {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ // We should keep the fields consistent for managing this data later
//                 itemName: itemName,
//                 description: description,
//                 price: price,
//                 quantity: quantity,
//                 images: images,
//                 offer: offer,
//                 // clockedIn:false,
//                 // dates:[]
//             })
//         })
//             .then(() => {
//                 // Once posted, the user will be notified 
//                 alert('Item Has Been Added!');
//             })
//     }

//     return (
//         <div>
//             <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3" >
//                     <Form.Label> Item Name </Form.Label>
//                     <Form.Control onChange={nameUpdate} type="text" placeholder="Enter item name" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" >
//                     <Form.Label> Description </Form.Label>
//                     <Form.Control onChange={descriptionUpdate} type="text" placeholder="Enter description" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" >
//                     <Form.Label> Price </Form.Label>
//                     <Form.Control onChange={priceUpdate} type="text" placeholder="Enter price" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" >
//                     <Form.Label> Quantity </Form.Label>
//                     <Form.Control onChange={quantityUpdate} type="text" placeholder="Enter quantity" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" >
//                     <Form.Label> Images </Form.Label>
//                     <Form.Control onChange={imagesUpdate} type="text" placeholder="Enter the image url " />
//                 </Form.Group>

//                 <Form.Group className="mb-3" >
//                     <Form.Label> Offer </Form.Label>
//                     <Form.Control onChange={offerUpdate} type="text" placeholder="Enter offer percentage" />
//                 </Form.Group>
                
//                 <Button variant="primary" type="submit">
//                     Submit
//                 </Button>
//             </Form>






//         </div>
//     )
// }

// export default ItemInsert;


