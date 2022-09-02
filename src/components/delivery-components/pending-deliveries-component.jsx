import React, { Fragment, useState } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import axios from "axios";
import Navbar from "../navbar.component";
import './delivery-styles.css';

const PendingDeliveries = () => {
  const [submissionList, setSubmissionList] = useState("");
  const [data, setData] = useState("");
  // const [records, setRecords] = useState("");

  const columns = [
    {
      key: "orderID",
      text: "Order ID",
      className: "name",
      align: "left",
      sortable: true,
      width: 150,
    },
    {
      key: "customerName",
      text: "Customer Name",
      className: "address",
      align: "left",
      sortable: true,
      width: 250,
    },
    {
      key: "amount",
      text: "Amount",
      className: "address",
      align: "left",
      sortable: true,
      width: 150,
    },
    {
      key: "action",
      text: "",
      className: "action",
      width: 300,
      align: "left",
      sortable: false,
      cell: (record) => {
        return (
          <Fragment>
            <button
              style={{ margin: "0 auto", display: "block" }}
              name="Delete"
              className="btn btn-danger btn-sm"
              onClick={() => deleteRecord(record)}
            >
              ARRANGE DELIVERY
            </button>
          </Fragment>
        );
      },
    },
  ];

  const config = {
    page_size: 5,
    length_menu: [5, 10, 20],
    button: {
      excel: false,
      print: false,
      extra: false,
    },
  };

  const records = [
    {
      orderID: "GG-1240",
      customerName: "Dulshan Alahakoon",
      amount: "LKR 4500.00",
    },
    {
      orderID: "GG-1284",
      customerName: "Gayan Alahakoon",
      amount: "LKR 3500.00",
    },
    {
      orderID: "GG-1244",
      customerName: "Pinidu Alahakoon",
      amount: "LKR 7500.00",
    },
    {
      orderID: "GG-1260",
      customerName: "Anura Alahakoon",
      amount: "LKR 8500.00",
    },
    {
      orderID: "GG-1250",
      customerName: "Sriyani Munasingha",
      amount: "LKR 4500.00",
    },
    {
      orderID: "GG-1245",
      customerName: "Ayesha Dasanayake",
      amount: "LKR 5500.00",
    }
  ];

  const extraButtons = [
    {
      className: "btn btn-primary buttons-pdf",
      title: "Export TEst",
      children: [
        <span>
          <i
            className="glyphicon glyphicon-print fa fa-print"
            aria-hidden="true"
          ></i>
        </span>,
      ],
      onClick: (event) => {
        console.log(event);
      },
    },
    {
      className: "btn btn-primary buttons-pdf",
      title: "Export TEst",
      children: [
        <span>
          <i
            className="glyphicon glyphicon-print fa fa-print"
            aria-hidden="true"
          ></i>
        </span>,
      ],
      onClick: (event) => {
        console.log(event);
      },
      onDoubleClick: (event) => {
        console.log("doubleClick");
      },
    },
  ];

  // componentDidMount(props) {
  //   axios.get(`${API_URL}/admin/submissionType/`)
  //     .then(res => {
  //       this.setState({ records: res.data });
  //     }
  //     )
  // }

  const editRecord = (record) => {
    this.props.history.push("/admin-submission-type-edit/" + record._id);
  };

  const deleteRecord = (record) => {
    try {
      axios
        .delete(`admin/submissionType/file-delete/${record._id}`)
        .then((response) => {
          console.log(response.data);
        });
      window.location.reload(true);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        this.setState = {
          errorMsg: "Error while deleting file. Try again later",
        };
      }
    }
  };

  return (
    <div style={{ backgroundColor: "rgb(207, 210, 207,0.5)", display: 'block', margin: '0 auto' }}>
      <Navbar />
      <a style={{ marginLeft: '10%', marginTop: '5vh', backgroundColor: 'rgb(34, 139, 34, 0.5)' }} href="#" class="previous">&laquo; Previous</a>
      <div style={{marginTop: '30px'}}>
      <div
        style={{ backgroundColor: "rgb(207, 210, 207,0.8)", height: "auto", width: '80%', display: 'block', margin: '0 auto',paddingLeft: '20px', paddingRight: '20px', paddingBottom: '20px' }}
      >
        <h3 style={{ textAlign: "center", paddingTop: "20px" }}>
          PENDING DELIVERIES
        </h3>
        <hr />
        <br />
        <ReactDatatable
          config={config}
          records={records}
          columns={columns}
          extraButtons={extraButtons}
        />
      </div>
      </div>
      <div
        style={{
          backgroundColor: "rgb(109, 112, 166,0.5)",
          height: "100px",
          position: 'inherit',
          marginBottom: '0',
          width: '100%',
          marginTop: '200px'
        }}
      />
    </div>
  );
};

export default PendingDeliveries;