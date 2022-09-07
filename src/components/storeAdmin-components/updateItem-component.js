import axios from "axios";
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function ItemUpdate(props) {

    //state variables
    var [itemName, setName] = useState();
    var [description, setDescription] = useState();
    var [price, setPrice] = useState();
    var [quantity, setQuantity] = useState();
    var [images, setImages] = useState();
    var [offer, setOffer] = useState();

    // const [item, setItem] = useState({
    //     itemName: "",
    //     description: "",
    //     price: "",
    //     quantity: "",
    //     images: "",
    //     offer: ""
    // });

    // Dealing with field changes to update state
    const nameUpdate = (event) => {
        setName(event.target.value)
    }
    const descriptionUpdate = (event) => {
        setDescription(event.target.value)
    }
    const priceUpdate = (event) => {
        setPrice(event.target.value)
    }
    const quantityUpdate = (event) => {
        setQuantity(event.target.value)
    }
    const imagesUpdate = (event) => {
        setImages(event.target.value)
    }
    const offerUpdate = (event) => {
        setOffer(event.target.value)
    }

    const getItem = async () => {
        try {
            const response = await axios.get('http://localhost:5050/storeAdmin/' + props.match.params.id);
            // setItem(response.data);
            setName(response.data.itemName);
            setDescription(response.data.description);
            setPrice(response.data.price);
            setQuantity(response.data.quantity);
            setImages(response.data.images);
            setOffer(response.data.offer);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getItem();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        const item = {
            itemName: itemName,
            description: description,
            price: price,
            quantity: quantity,
            images: images,
            offer: offer,
        }
        console.log('a', item)
        axios.post('http://localhost:5050/storeAdmin/update/' + props.match.params.id, item)
            .then(res => console.log(res.data), alert("Successfully updated"));

        window.location = '/storeAdmin';
    }

    return (
        <div>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" >
                    <Form.Label> Item Name </Form.Label>
                    <Form.Control defaultValue={itemName} onChange={nameUpdate} type="text" placeholder="Enter item name" required/>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label> Description </Form.Label>
                    <Form.Control defaultValue={description || ''} onChange={descriptionUpdate} type="text" placeholder="Enter description" required/>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label> Price </Form.Label>
                    <Form.Control defaultValue={price} onChange={priceUpdate} type="text" placeholder="Enter price" required/>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label> Quantity </Form.Label>
                    <Form.Control defaultValue={quantity} onChange={quantityUpdate} type="text" placeholder="Enter quantity" required/>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label> Images </Form.Label>
                    <Form.Control defaultValue={images} onChange={imagesUpdate} type="text" placeholder="Enter the image url " required/>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label> Offer </Form.Label>
                    <Form.Control defaultValue={offer} onChange={offerUpdate} type="text" placeholder="Enter offer percentage" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </div>
    )
}

export default ItemUpdate;


