import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";
import { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
// import InsertItemModal from "./insertItemModal";
// import UpdateItemModal from "./updateItemModal";
import "./allUsers.css";
import "./tableTharidu.css"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";


function AllRegisteredMemebersDisplay() {

    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const [modal, setModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);

    const columns = [
        {
            name: 'Images',
            selector: row => <img alt="itemimage" width={100} height={100} src={row.image} />,
            width: '200px'
        },
        {
            name: 'First Name',
            selector: row => row.firstName,
            sortable: true,
            width: "170px"
        },
        {
            name: 'Last name',
            selector: row => row.lastName,
            width: '160px'
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            width: '350px'

        },
        {
            name: 'Registered Date',
            selector: row => row.registeredDate,
            sortable: true,
            width: '250px'

        },
        {
            name: 'Action',
            cell: (row) =>
                <>
                    <Fragment>
                        {/* <button onClick={() => openUpdateModal(row._id)} type="button" className=" editbtn btn btn-outline-secondary btn-sm" >  Edit</button> */}
                        <button onClick={() => onSubmit(row._id)} type="button" className="btn btn-outline-danger btn-sm" > Delete</button>
                    </Fragment>
                </>
        },
    ];

    const onSubmit = (id) => {
        axios.delete("http://localhost:5050/user/" + id)
            .then((res) => {
                alert("Successfully deleted");
                const modified = filteredItems.filter(item => item._id !== id);
                setFilteredItems(modified);
            });
    }

    const getItems = async () => {
        try {
            const response = await axios.get('http://localhost:5050/user/get-all');
            setItems(response.data);
            setFilteredItems(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getItems();
    }, [])

    // useEffect(() => {
    //     const result = items.filter((item) => {
    //         return item.itemName.toLowerCase().match(search.toLowerCase());
    //     });
    //     setFilteredItems(result);
    // }, [search])

    useEffect(() => {
        const d = new Date();
        let month = d.getMonth() + 1
        let date = d.getFullYear() + "-" + month + "-" + d.getDate();
        setToday(date)
    })

    const [data, setData] = useState({
        fromDate: "",
        toDate: "",
        invoice: [],
        firstName: "",
        lastName: "",
        email: ""
    });

    const [searchData, setSearchData] = useState([]);
    const [today, setToday] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:5050/user/search", {
                fromDate: data.fromDate,
                toDate: data.toDate,
            })
            .then((response) => {
                // console.log(response.data);
                // setSearchData(response.data);
                setFilteredItems(response.data);

            });
    };

    const clearData = (e) => {
        window.location.reload(false);

    }


    const openInsertModal = () => {
        setModal(true);
    }

    const closeInsertModal = () => setModal(false);

    const openUpdateModal = (data) => {
        setUpdateModal(true);
        window.sessionStorage.setItem("item", data);
    }

    const closeUpdateModal = () => setUpdateModal(false);

    const ModalContent = () => {
        return (
            <Modal show={updateModal} onHide={closeUpdateModal} backdrop="static" size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        Update Item Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <UpdateItemModal />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeUpdateModal}> Close Button </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    const goBack = () => {
        window.location = "/user-admin-dashboard"
    }

    const generateReport = () => {
        window.location = "/user-admin-report"
    }


    return (
        <>
            <div className="container bkgrnd">

                <Link onClick={goBack} to="#" className="backLink">
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                    &nbsp;Go Back
                </Link>
                <h1 className="header">Store Warehouse</h1>

                <form onSubmit={handleSubmit}>
                    <div >
                        <input
                            type="Date"
                            placeholder="Date"
                            name="fromDate"
                            onChange={handleChange}
                            value={data.fromDate}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="Date"
                            placeholder="Date"
                            name="toDate"
                            onChange={handleChange}
                            value={data.toDate}
                            required
                        />
                    </div>


                    <button type="submit">
                        Search
                    </button>
                    <button onClick={clearData}>
                        Clear
                    </button>

                </form>

                <div className="tbl">
                    <DataTable
                        columns={columns}
                        data={filteredItems}
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight="500px"
                        highlightOnHover
                        subHeader
                    />
                   
                </div>


                <button className="reportbtn btn btn-dark" onClick={generateReport}> Generate Reports</button>
            </div>

        </>
    );

}

export default AllRegisteredMemebersDisplay;