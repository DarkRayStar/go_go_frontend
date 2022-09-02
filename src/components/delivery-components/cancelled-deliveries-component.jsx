import React, { Fragment, useState } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import axios from "axios";
import Navbar from "../navbar.component";
import "./delivery-styles.css";

const CancelledDeliveries = () => {
  const [submissionList, setSubmissionList] = useState("");
  const [data, setData] = useState("");
  // const [records, setRecords] = useState("");

  const columns = [
    {
      key: "deliveryID",
      text: "DELIVERY ID",
      className: "name",
      align: "left",
      sortable: true,
      width: 150,
    },
    {
      key: "customerName",
      text: "CUSTOMER NAME",
      className: "address",
      align: "left",
      sortable: true,
      width: 250,
    },
    {
      key: "action",
      text: "",
      className: "address",
      width: 200,
      align: "center",
      sortable: false,
      cell: (record) => {
        return (
          <div style={{ textAlign: "center" }}>
            <Fragment>
              <button
                name="view"
                className="btn btn-danger btn-sm"
                onClick={() => deleteRecord(record)}
              >
                VIEW DETAILS
              </button>
            </Fragment>
          </div>
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
      deliveryID: "GG-1240",
      customerName: "Dulshan Alahakoon",
    },
    {
      deliveryID: "GG-1284",
      customerName: "Gayan Alahakoon",
    },
    {
      deliveryID: "GG-1244",
      customerName: "Pinidu Alahakoon",
    },
    {
      deliveryID: "GG-1260",
      customerName: "Anura Alahakoon",
    },
    {
      deliveryID: "GG-1250",
      customerName: "Sriyani Munasingha",
    },
    {
      deliveryID: "GG-1245",
      customerName: "Ayesha Dasanayake",
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
    <div
      style={{
        backgroundColor: "rgb(207, 210, 207,0.5)",
        display: "block",
        margin: "0 auto",
      }}
    >
      <Navbar />
      <a
        style={{
          marginLeft: "10%",
          marginTop: "5vh",
          backgroundColor: "rgb(34, 139, 34, 0.5)",
        }}
        href="#"
        class="previous"
      >
        &laquo; Previous
      </a>
      <div style={{ marginTop: "30px" }}>
        <div
          style={{
            backgroundColor: "rgb(207, 210, 207,0.8)",
            height: "auto",
            width: "80%",
            display: "block",
            margin: "0 auto",
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingBottom: "20px",
          }}
        >
          <h3 style={{ textAlign: "center", paddingTop: "20px" }}>
            CANCELLED DELIVERIES
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
          position: "inherit",
          marginBottom: "0",
          width: "100%",
          marginTop: "200px",
        }}
      />
    </div>
  );
};

export default CancelledDeliveries;