import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios";
import ApexCharts from 'apexcharts';
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";

function StoreAdminReport() {

    const [items, setItems] = useState([]);
    const options = { labels: ["Cases", "Recovered", "Deaths"] };
    const [covidData] = useState([
        44, 17, 15
    ]);
    // const quantities = [];

    const options1 = {
        chart: {
            id: 'weather-graph'
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            title: {
                text: 'Item Name',
            },
        },
        yaxis: {
            title: {
                text: 'Quantity',
            },
        },
    }

    const [dataa] = useState([
        5, 4, 6, 5, 6, 4, 7, 1, 2, 20, 21
    ])

    const [quantities, setQuantities] = useState([]);

    const getItems = async () => {
        try {
            const response = await axios.get('http://localhost:5050/storeAdmin');
            // setItems(response.data);
            for (let i = 0; i < response.data.length; i++) {
                quantities.push(parseInt(response.data[i].orderedQuanity));
            }
        } catch (err) {
            console.log(err);
        }
        // console.log('a', quantities);
        // console.log('b', dataa);
    }

    function getItems1() {
        const temp = [];
        axios.get('http://localhost:5050/storeAdmin').then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                temp.push(parseInt(response.data[i].orderedQuanity));
            }
            setQuantities(temp);
        })
        console.log('a', quantities);
    }

    useEffect(() => {
        // getItems();
        getItems1();
    }, [])

    return (
        <div className='container'>
            <div className="row">
                <div className="mixed-chart">
                    <Chart
                        options={options}
                        series={covidData.map((data) => data)}
                        type="donut"
                        width="300"
                    />
                </div>
            </div>

            <div className='row'>
                <Chart options={options1}
                    series={[{
                        name: 'temp',
                        data: quantities
                    }]}
                    type="bar"
                    height={'350px'}
                    width={'75%'} />

            </div>
        </div>
    )
}

export default StoreAdminReport
