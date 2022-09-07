import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";
import { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import InsertItemModal from "./insertItemModal";
import UpdateItemModal from "./updateItemModal";

function ItemRetrieve() {

    const [items, setItems] = useState([]);
    const [search, setSearch] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [modal, setModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    
    const [modelInfo, setModelInfo] = useState([]);
    const [showModal1, setShowModal1] = useState(false);

    const columns = [
        {
            name: 'Item Name',
            selector: row => row.itemName,
            sortable: true
        },
        {
            name: 'Description',
            selector: row => row.description,
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable: true

        },
        {
            name: 'Quantity',
            selector: row => row.quantity,
            sortable: true

        },
        {
            name: 'Images',
            selector: row => row.images,
        },
        {
            name: 'Offer',
            selector: row => row.offer,
            sortable: true

        },
        // {
        //     name: 'Edit',
        //     cell: (row) => 
        //     <Link to={"/storeAdmin1/update/" + row._id} > <button type="button" className="btn btn-primary btn-sm" > Edit</button></Link>
        // },
        {
            name: 'Edit',
            cell: (row) =>
            <>
                <Fragment>
                    <Button onClick={() => openUpdateModal(row._id)} > Edit</Button>
                    <button onClick={() => onSubmit(row._id)} type="button" className="btn btn-danger btn-sm" > Delete</button>
                </Fragment>
                {/* <Fragment> */}
                    {/* Update Modal */}
                    

                {/* </Fragment> */}
                </>
        },
        {
            name: 'Edit',
            cell: (row) =>
            <>
            
            </>
        }
    ];

    const onSubmit = (id) => {
        axios.delete("http://localhost:5050/storeAdmin/" + id)
            .then((res) => {
                alert("Successfully deleted");
                // window.location = '/';
                const modified = filteredItems.filter(item => item._id !== id);
                setFilteredItems(modified);
            });
            console.log('a',id)
    }

    const getItems = async () => {
        try {
            const response = await axios.get('http://localhost:5050/storeAdmin');
            setItems(response.data);
            setFilteredItems(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getItems();
    }, [])

    useEffect(() => {
        const result = items.filter((item) => {
            return item.itemName.toLowerCase().match(search.toLowerCase());
        });
        setFilteredItems(result);
    }, [search])

    const openInsertModal = () => {
        setModal(true);
    }

    const closeInsertModal = () => setModal(false);

    const openUpdateModal = (data) => {
        setUpdateModal(true);
        window.sessionStorage.setItem("item", data);
    }

    const closeUpdateModal = () => setUpdateModal(false);

    // const rowEvents = {
    //     onClick: (e, row) => {
    //         console.log(row);
    //         setModelInfo(row);
    //         toggleTrueFalse()
    //     }
    // }

    // const toggleTrueFalse = () => {
    //     setShowModal1(openUpdateModal);
    // }

    const ModalContent = () => {
        return(
            <Modal show={updateModal} onHide={closeUpdateModal} backdrop="static" size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>
                                 {modelInfo.itemName}
                                 {modelInfo._id}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="show-grid">
                            <UpdateItemModal  />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            <Button variant="secondary" onClick={closeUpdateModal}> Close Button </Button>
                        </Modal.Footer>
                    </Modal>
        )
    }

    return (
        <>
            <Button onClick={openInsertModal}> Hello </Button>
            <div className="d-flex flex-column align-items-center">
                <h1> REACT DATA TABLE</h1>
                <DataTable
                    title="Item List"
                    columns={columns}
                    data={filteredItems}
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="450px"
                    highlightOnHover
                    selectableRows
                    subHeader
                    subHeaderComponent={<input
                        type="text"
                        placeholder="Search here.."
                        className="w-25 form-control"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    }
                    actions={<button className="btn btn-sm btn-info"> Export</button>}
                    // rowEvents={rowEvents}
                />
                {updateModal ? <ModalContent/> : null}
            </div>

            {/* Insert Modal */}
            <Modal show={modal} onHide={closeInsertModal} backdrop="static" size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        Insert Item
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <InsertItemModal />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <Button variant="secondary" onClick={closeInsertModal}> Close Button </Button>
                </Modal.Footer>
            </Modal>

        </>
    );

}

export default ItemRetrieve;