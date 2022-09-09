import React, { Fragment, useEffect, useState } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import axios from "axios";
import Navbar from "../navbar.component";
import { Link, useHistory } from "react-router-dom";
import "./delivery-styles.css";
import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";

const OngoingDeliveries = () => {
  let history = useHistory();
  const [submissionList, setSubmissionList] = useState("");
  const [data, setData] = useState("");

  const [count, setCount] = useState(0);

  const logResult = useCallback(() => {
    return 2 + 2;
  }, []); //logResult is memoized now.

  useEffect(() => {
    axios.get("http://localhost:5050/delivery/").then((res) => {
      setData(res.data);
    });
  }, [logResult]);

  const columns = [
    {
      key: "_id",
      text: "DELIVERY ID",
      className: "name",
      align: "left",
      sortable: true,
      width: 100,
    },
    {
      key: "customerName",
      text: "CUSTOMER NAME",
      className: "address",
      align: "left",
      sortable: true,
      width: 180,
    },
    {
      key: "fee",
      text: "FEE",
      className: "address",
      align: "left",
      sortable: true,
      width: 100,
    },
    {
      key: "service",
      text: "SERVICE",
      className: "address",
      align: "left",
      sortable: true,
      width: 150,
    },
    {
      key: "trackingID",
      text: "TRACKING ID",
      className: "address",
      align: "left",
      sortable: true,
      width: 150,
    },
    {
      key: "action",
      text: "UPDATE DELIVERY STATUS",
      className: "address",
      width: 400,
      align: "center",
      sortable: false,
      cell: (record) => {
        return (
          <div style={{ textAlign: "center" }}>
            <Fragment>
              <button
                style={{ marginRight: "5px" }}
                name="update"
                className="btn btn-danger btn-sm"
                onClick={() => updateRecord(record)}
              >
                UPDATE
              </button>
              <button
                style={{ marginRight: "5px" }}
                name="view"
                className="btn btn-danger btn-sm"
                onClick={() => deleteRecord(record)}
              >
                VIEW
              </button>
              <button
                style={{ marginRight: "5px" }}
                name="delivered"
                className="btn btn-danger btn-sm"
                onClick={() => deleteRecord(record)}
              >
                DELIVERED
              </button>
              <button
                name="cancel"
                className="btn btn-danger btn-sm"
                onClick={() => deleteRecord(record)}
              >
                CANCEL
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
      deliveryID: "DEL-12040",
      customerName: "Dulshan Alahakoon",
      fee: "LKR 300.00",
      service: "DOMEX",
      trackingID: "DMX-115425",
    },
    {
      deliveryID: "DEL-12040",
      customerName: "Dulshan Alahakoon",
      fee: "LKR 300.00",
      service: "DOMEX",
      trackingID: "DMX-115425",
    },
    {
      deliveryID: "DEL-12040",
      customerName: "Dulshan Alahakoon",
      fee: "LKR 300.00",
      service: "DOMEX",
      trackingID: "DMX-115425",
    },
    {
      deliveryID: "DEL-12040",
      customerName: "Dulshan Alahakoon",
      fee: "LKR 300.00",
      service: "DOMEX",
      trackingID: "DMX-115425",
    },
    {
      deliveryID: "DEL-12040",
      customerName: "Dulshan Alahakoon",
      fee: "LKR 300.00",
      service: "DOMEX",
      trackingID: "DMX-115425",
    },
    {
      deliveryID: "DEL-12040",
      customerName: "Dulshan Alahakoon",
      fee: "LKR 300.00",
      service: "DOMEX",
      trackingID: "DMX-115425",
    },
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

  const updateRecord = (record) => {
    sessionStorage.setItem("currentDeliveryUpdateID", record._id);
    window.location = "/delivery-update";
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

      <Link
        style={{
          marginLeft: "10%",
          marginTop: "5vh",
          marginBottom: "5vh",
        }}
        onClick={() => history.goBack()}
        to="#"
        className="backLink"
      >
        <FontAwesomeIcon icon={faArrowAltCircleLeft} />
        &nbsp;Go Back
      </Link>

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
            ONGOING DELIVERIES
          </h3>
          <hr />
          <br />
          <ReactDatatable
            config={config}
            records={data}
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

export default OngoingDeliveries;
