import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

function ViewFavItems() {

    const [favItems, setFavItems] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);


    const getFavItems = async () => {
        try {
            const response = await axios.get('http://localhost:5050/favorites');
            setFavItems(response.data);
            setFilteredItems(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        {
            name: "Image",
            selector: (row) => <img width={150} height={100} src={row.image} alt="item " />
        },
        {
            name: "Item Name",
            selector: (row) => row.itemName,
            sortable: true,
        },
        {
            name: "Description",
            selector: (row) => row.description,
        },
        {
            name: "Price",
            selector: (row) => row.price,
            sortable: true,
        },

        {
            name: "Date Added",
            selector: (row) => row.date.substring(0, 10),
        },
        {
            name: "Action",
            cell: row => <button className='btn btn-sm btn-danger' onClick={() => onDeleteItem(row._id)}> Remove</button>
        },
    ]

    useEffect(() => {
        getFavItems();
    }, [])


    useEffect(() => {
        const result = favItems.filter((item) => {
            return item.itemName.toLowerCase().match(search.toLowerCase()) || item.price.toLowerCase().match(search.toLowerCase());
        });
        setFilteredItems(result);
    }, [search, favItems])

    //Remove Item
    const onDeleteItem = async (id) => {
        if (window.confirm('Are you sure, you want to delete the selected Item?')) {
            try {
                await axios({
                    method: 'DELETE',
                    url: `http://localhost:5050/favorites/${id}`
                })
                alert("Selected Item is Removed !!")
                getFavItems()
            } catch (error) {
                alert(error)
            }
        }
    }

    return (
        <div>
            <br /><br />
            <DataTable
                title="Favorite Items"
                columns={columns}
                data={filteredItems}
                pagination
                fixedHeader
                fixedHeaderScrollHeight='500px'
                highlightOnHover
                subHeader
                subHeaderComponent={
                    <input type="text"
                        placeholder='Search Here'
                        className='w-25 form-control'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                }
            // subHeaderAlign="center"
            // selectableRows
            // selectableRowsHighlight
            />
        </div>
    )
}

export default ViewFavItems