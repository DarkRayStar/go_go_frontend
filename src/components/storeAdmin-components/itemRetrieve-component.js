import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

function ItemRetrieve(){

    const [items, setItems] = useState([]);
    const [search, setSearch] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

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
        {
            name: 'Edit',
            cell: (row) => 
            <Link to={"/storeAdmin1/update/" + row._id} > <button type="button" className="btn btn-primary btn-sm" > Edit</button></Link>
        },
        {
            name: 'Delete',
            cell: row => <button onClick={() => onSubmit(row._id)} type="button" className="btn btn-danger btn-sm" > Delete</button>
        },
    ];

    const onSubmit = (id) => {
        axios.delete("http://localhost:5050/storeAdmin/" + id)
            .then((res) => {
                alert("Successfully deleted");
                // window.location = '/';
                const modified = filteredItems.filter(item => item._id !== id);
                setFilteredItems(modified);
            });
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
        const result = items.filter((item) =>{
            return item.itemName.toLowerCase().match(search.toLowerCase());
        });
        setFilteredItems(result);
    }, [search])

    return(
        <>
            <div className="d-flex flex-column align-items-center">
                <h1> REACT DATA TABLE</h1>
                <DataTable
                title = "Item List"
                columns={columns}
                data={filteredItems}
                pagination
                fixedHeader
                fixedHeaderScrollHeight="450px"
                highlightOnHover
                selectableRows
                subHeader
                subHeaderComponent={ <input 
                    type="text" 
                    placeholder="Search here.." 
                    className="w-25 form-control"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    /> 
                }
                actions={<button className="btn btn-sm btn-info"> Export</button>}
                />
            </div>
        </>
    );

}

export default ItemRetrieve;