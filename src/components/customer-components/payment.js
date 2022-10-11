import React, { useEffect } from 'react'
import { render } from 'react-dom'
import Styles from './Styles'
import { Form, Field } from 'react-final-form'
import Card from './Card'
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate
} from './cardUtils'
import axios from 'axios'
import Swal from "sweetalert2";

let updateID = JSON.parse(sessionStorage.getItem("itemID"))
let price = sessionStorage.getItem("totalPayemt")
let payId = "";

const onSubmit = async () => {

    try {
        const data = {
            paidStatus: true,
            showOnCart: false,
            orderedDate: new Date().toLocaleString(),
        }

        // console.log("orderd Date", data.orderedDate);
        for (var j = 0; j < updateID.length; j++) {
            payId = updateID[j];
            var response = await axios.post(`http://localhost:5050/cart/updatePayment/${payId}`, data)
        }
        if (response.status === 200) {
            Swal.fire(
                'Payment Successful!',
                'RS: ' + price + '.00',
                'success'
            )
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            })
        }

    } catch (error) {
        alert(error);
    }
}

const Payment = () => (
    <Styles>
        <h3 className="PaymentHeaderMod"> Pay Now</h3>
        <Form
            onSubmit={onSubmit}
            render={({
                handleSubmit,
                form,
                submitting,
                pristine,
                values,
                active
            }) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <Card
                            number={values.number || ''}
                            name={values.name || ''}
                            expiry={values.expiry || ''}
                            cvc={values.cvc || ''}
                            focused={active}
                        />
                        <center>
                            <div>
                                Total : {price}
                            </div>
                        </center>
                        <div>
                            <Field
                                name="number"
                                component="input"
                                type="text"
                                pattern="[\d| ]{16,22}"
                                placeholder="Card Number"
                                format={formatCreditCardNumber}
                                required
                            />
                        </div>
                        <div>
                            <Field
                                name="name"
                                component="input"
                                type="text"
                                placeholder="Name"
                                required
                            />
                        </div>
                        <div>
                            <Field
                                name="expiry"
                                component="input"
                                type="text"
                                pattern="\d\d/\d\d"
                                placeholder="Valid Thru"
                                format={formatExpirationDate}
                                required
                            />
                            <Field
                                name="cvc"
                                component="input"
                                type="text"
                                pattern="\d{3}"
                                placeholder="CVC"
                                format={formatCVC}
                                required
                            />
                        </div>
                        <div className="buttons">
                            <button type="submit" disabled={submitting}>
                                Submit
                            </button>
                            <button
                                type="button"
                                onClick={form.reset}
                                disabled={submitting || pristine}
                            >
                                Reset
                            </button>
                        </div>

                    </form>
                )
            }}
        />
    </Styles>
)


export default Payment
