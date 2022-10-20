import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios";
import Chart from "react-apexcharts";
import AdminNav from '../navigatonBar/adminNav';

function StoreAdminReport() {
    
    const [items, setItems] = useState([]);
    const options = { labels: items };
    const [quantities, setQuantities] = useState([]);
    const [covidData, setCoviddata] = useState([
        44, 17, 15 , 20
    ]);

    const options1 = {
        chart: {
            id: 'weather-graph'
        },
        xaxis: {
            categories: items,
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


    function getItems() {
        const temp = [];
        const temp1 = [];
        axios.get('http://localhost:5050/storeAdmin').then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                temp.push(parseInt(response.data[i].orderedQuanity));
                temp1.push(response.data[i].itemName);
            }
            setQuantities(temp);
            setItems(temp1);
            setCoviddata(temp);
        })
    }

    useEffect(() => {
        getItems();
    }, [])

    return (
        <div className='container'>
            <AdminNav/>
            <h2 style={{ marginTop:"100px", textAlign:"center"}}> SOLD ITEM QUANTITIES OVERVIEW</h2>
            <div className="row" style={{ marginTop:"50px", marginLeft:"400px"}}>
                <div className="mixed-chart">
                    <Chart
                        options={options}
                        series={covidData.map((data) => data)}
                        type="donut"
                        width="600"
                    />
                </div>
            </div>

            <center>
            <div className='row' style={{ marginTop:"50px", marginBottom:"50px"}}>
                <Chart options={options1}
                    series={[{
                        name: 'temp',
                        data: quantities
                    }]}
                    type="bar"
                    height={'350px'}
                    width={'85%'} />

            </div>
            </center>
        </div>
    )
}

export default StoreAdminReport
