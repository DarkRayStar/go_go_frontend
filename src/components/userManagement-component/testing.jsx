import React, { useState, useEffect, Fragment, useRef } from 'react';
import axios from "axios";
import AdminNavBar from './AdminNavBar';
import DeliveryAdminSideBar from './NavBar/DeliveryAdminSideBar';
import EditDelivery from './EditDelivery';
import ViewDeliveryTable from './ViewDeliveryTable';
import { useReactToPrint } from "react-to-print"
import Swal from "sweetalert2";

export default function ViewDeliveries() {

    const componentRef = useRef();
        const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
   
    const [deliveries, setDeliveries] = useState([]);
    const [q, setQ] = useState("");

    useEffect(() => {
        const getDeliveries = async () => {
            const { data } = await axios.get("http://localhost:8070/delivery/")
            console.log(data)
            setDeliveries(data)
        }
        getDeliveries();
    }, [])

    const [editFormData, setEditFormData] = useState({
        deliveryId: "",
        customerName: "",
        customerContactNumber: "",
        deliveryAddress: "",
        orderCategory: "",
        quantity: "",
        driverName: "",
        driverContactNumber: "",
        deliveryDate: "",
    })

    const handleEditFormChange = (e) => {
        e.preventDefault();

        const fieldName = e.target.getAttribute("name");
        const fieldValue = e.target.value;

        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }

    function updateData(e){
        e.preventDefault();

        const updateDelivery ={
            ID: editDelivery,
            customerName: editFormData.customerName,
            customerContactNumber: editFormData.customerContactNumber,
            deliveryAddress: editFormData.deliveryAddress,
            orderCategory: editFormData.orderCategory,
            quantity: editFormData.quantity,
            driverName: editFormData.driverName,
            driverContactNumber: editFormData.driverContactNumber,
            deliveryDate: editFormData.deliveryDate
        }

        axios.put("http://localhost:8070/delivery/update/:ID",updateDelivery).then(()=>{
          
            Swal.fire({
                title: "Success!",
                text: "Updated Successfully",
                icon: "success",
                showConfirmButton: false,
            })
        }).catch((err) =>{
          
            Swal.fire({
                title: "Error!",
                text: "Couldn't Update your Details",
                icon: "error",
            });
        });
        setTimeout(() => {
            window.location.replace("http://localhost:3000/ViewDeliveries");
            }, 2000)
    }

    const [editDelivery,setEditDelivery] = useState(null);

    const handleEditClick = (e, delivery)=> {
        e.preventDefault();
        setEditDelivery(delivery._id)

        const formValues = {
            deliveryId: delivery.deliveryId,
            customerName: delivery.customerName,
            customerContactNumber: delivery.customerContactNumber,
            deliveryAddress: delivery.deliveryAddress,
            orderCategory: delivery.orderCategory,
            quantity: delivery.quantity,
            driverName: delivery.driverName,
            driverContactNumber: delivery.driverContactNumber,
            deliveryDate: delivery.deliveryDate,
        }
        setEditFormData(formValues);
    }

    const handleCancelClick = () => {
        setEditDelivery(null);
    }

    const handleDeleteClick = (id) => {
        axios.delete('http://localhost:8070/delivery/delete/'+id).then(()=>{
            alert("Delivery Details Deleted")
            window.location.reload();
        }).catch((err) =>{
            alert(err)
        })
    }

    return (
        <div>
            <AdminNavBar/>
            <DeliveryAdminSideBar/>

        <div className="container">
            <br></br>
            <h1 className="text-center">Delivery Details</h1>
            <br></br>
            <div id="repGSearch" className='col-lg-3 mt-2 mb-2 ml-5'>
                <input type="text" className="search" placeholder="Search Products..." value={q} onChange={(e)=> setQ(e.target.value)}/>      
            </div>
            <br></br>
            
                 <div className="row">
                 <div ref={componentRef}>
                 <form onSubmit={updateData}>
                 <table className="table table-striped table borderd">
                     <thead>
                         <tr>
                             <th>Delivery ID</th>
                             <th>Customer Name</th>
                             <th>Customer Contact</th>
                             <th>Address</th>
                             <th>Order Category</th>
                             <th>Quantity</th>
                             <th>Driver Name</th>
                             <th>Driver Contact</th>
                             <th>Delivery Date</th>
                             <th>Actions</th>
                         </tr>
                     </thead>
                     <tbody>
                         {deliveries.filter((delivery)=> {
                            if(q === ""){
                               return delivery
                            }else if(delivery.deliveryId.toLowerCase().includes(q.toLowerCase())) {
                            return delivery
                            }
                        }).map((delivery)=> (
                        <Fragment>
                             {editDelivery === delivery._id ? (
                               <EditDelivery
                                   editFormData={editFormData}
                                   handleEditFormChange={handleEditFormChange}
                                   handleCancelClick={handleCancelClick}
                              />
                        ) : (
                              <ViewDeliveryTable
                                 delivery={delivery}
                                 handleEditClick={handleEditClick}
                                 handleDeleteClick={handleDeleteClick}
                             />
                        )}
     
                        </Fragment>
                        ))}
                     </tbody>
                 </table>
                 </form>
                 </div>

             </div>
             <button onClick={handlePrint} className="btn btn-outline-success"> Print Report </button>

        </div>
        </div>
    )
}
