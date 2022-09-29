import React, { Component } from "react";
import axios from "axios";

export default class viewAllUsersDetails extends Component {
  constructor(props) {
    super(props);

    this.onChangeFromDate = this.onChangeFromDate.bind(this);
    this.onChangeToDate = this.onChangeToDate.bind(this);
    this.onsubmitSearch = this.onsubmitSearch.bind(this);

    this.state = {
      invoice: [],
      searchReport: "",
      fromDate: "",
      toDate: "",
      total: 0,
      total1: 0,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5050/user/get-all")
      .then((res) => {
        this.setState({
          invoice: res.data
        });
        console.log(res.data)
      })
      .catch(function (error) {
      });
  }


  onChangeFromDate = (event) => {
    this.setState({ fromDate: event.target.value });
  };

  onChangeToDate = (event) => {
    this.setState({ toDate: event.target.value });
  };

  onsubmitSearch = (e) => {
    e.preventDefault();
    this.setState({ total: 0 });

    axios
      .post("http://localhost:5050/user/search", {
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
      })
      .then((response) => {
        this.setState({
          invoice: response.data,
        });
      });
  };

  render() {
    return (
      <div>

        <div style={{ marginTop: "30px" }}>
          <div>
            <div>
              <form onSubmit={this.onsubmitSearch}>
                <div>
                  <div>
                    <div >
                      <label>From Date</label>
                    </div>
                    <div>
                      <label>To Date</label>
                    </div>
                  </div>

                  <div>
                    <div>
                      <input
                        type="Date"
                        value={this.state.fromDate}
                        onChange={this.onChangeFromDate}
                        required
                      ></input>
                    </div>
                    <div>
                      <input
                        type="Date"
                        value={this.state.toDate}
                        onChange={this.onChangeToDate}
                        required
                      ></input>
                    </div>
                  </div>

                  <div style={{ marginTop: "25px", marginLeft: "200px" }}>
                    <button type="submit">Search</button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Display all invoices */}

          <div style={{ marginTop: "40px" }} className="">
            <table id="reportT">
              <thead>
                <tr>
                  <td style={{ width: "10px" }}>Invoice Number</td>
                  <td style={{ width: "100px" }}>Amount</td>
                  <td style={{ width: "100px" }}>Customer</td>
                </tr>
              </thead>

              <tbody>
                {this.state.invoice.map((invoice) => (
                  <tr key={invoice._id}>
                    <td>{invoice.firstName}</td>
                    <td>{invoice.lastName}</td>
                    <td>{invoice.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    );
  }
}