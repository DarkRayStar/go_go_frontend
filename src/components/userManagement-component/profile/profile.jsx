import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "./styles.module.css";
import { faHeart, faListAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function UserProfile(props) {

    //state variables
    var [firstName, setFirstName] = useState("");
    var [lastName, setLastName] = useState("");
    var [mobileNumber, setMobileNumber] = useState("");
    var [phoneNumber, setPhoneNumber] = useState("");
    var [address, setAddress] = useState("");
    var [district, setDistrict] = useState("");
    var [zipCode, setZipCode] = useState("");
    var [email, setEmail] = useState("");
    var [image, setImage] = useState("");

    var [sessionUser, setSessionUser] = useState("");

    const getUserDetailsByID = async () => {
       //get the user details from the session
        setSessionUser = sessionStorage.getItem("loggeduser");
        console.log("get user details", sessionUser);
        try {
            const response = await axios.get('http://localhost:5050/user/' + props.match.params.id);
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setMobileNumber(response.data.mobileNumber);
            setPhoneNumber(response.data.phoneNumber);
            setAddress(response.data.address);
            setDistrict(response.data.district);
            setZipCode(response.data.zipCode);
            setEmail(response.data.email);
            setImage(response.data.image);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getUserDetailsByID();
    }, [])


    const UpdateDetails = () => {
        // window.location = '/';
    }

    const DeleteAccount = () => {
        // window.location = '/';
    }

    const Logout = () => {
        // window.location = '/';
        // sessionStorage.clear();
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     const item = {
    //         firstName: firstName,
    //         lastName: lastName,
    //         mobileNumber: mobileNumber,
    //         phoneNumber: phoneNumber,
    //         images: images,
    //         offer: offer,
    //     }
    //     console.log('a', item)
    //     axios.post('http://localhost:5050/storeAdmin/update/' + props.match.params.id, item)
    //         .then(res => console.log(res.data), alert("Successfully updated"));

    //     window.location = '/storeAdmin';
    // }

    return (
        <div className={styles.background}>
            <div className={styles.cartDetails_container}>

                {/* cart and History Details */}

                <table className={styles.cartDetailsTable} style={{ height: "20px", width: "250px", textAlign: "center", marginLeft: "1100px", color: "white", marginTop: "0px", marginBottom: "-100px" }}>
                    <tr>
                        <td style={{}}><Link to="/fav/view/"><FontAwesomeIcon icon={faHeart} /></Link></td>
                        <td style={{ marginLeft: "0px" }}><Link to="#"><FontAwesomeIcon icon={faListAlt} /></Link></td>
                    </tr>
                    <tr>
                        <th>favorite <br></br>Items</th>
                        <th>Order <br></br> History</th>
                    </tr>
                </table>
            </div>
            <div className={styles.profile_container}>
                <div className={styles.profile_form_container}>

                    <div className={styles.left}>
                    <h2 style={{color:"white", textAlign:"center"}}> Welcome<br></br> {firstName} {lastName}</h2><br></br>
                        <img style={{ width: "220px", height: "220px" }} src={image} alt=""></img>
                    </div>

                    <div className={styles.right}>
                        <form className={styles.form_container}>



                            <h1 style={{ marginTop: "50px", marginBottom: "20px" }}>Account Details</h1>

                            <table>
                                <tr>
                                    <td><label className={styles.input} style={{ fontWeight: 'bold', marginLeft: "-30px" }}>First Name    : <label style={{ fontWeight: 'normal' }}>{firstName}</label></label></td>
                                    <td><label className={styles.input} style={{ fontWeight: 'bold', marginLeft: "30px", marginLeft: "30px" }}>Last Name    : <label style={{ fontWeight: 'normal' }}>{lastName}</label></label></td>
                                </tr>
                                <tr>
                                    <td><label className={styles.input} style={{ fontWeight: 'bold', marginLeft: "-30px" }}>Mobile Number    : <label style={{ fontWeight: 'normal' }}>{mobileNumber}</label></label></td>
                                    <td><label className={styles.input} style={{ fontWeight: 'bold', marginLeft: "30px" }}>Phone Number    : <label style={{ fontWeight: 'normal' }}>{phoneNumber}</label></label></td>
                                </tr>
                                <tr>
                                    <td><label className={styles.input} style={{ fontWeight: 'bold', marginLeft: "-30px" }}>Email    : <label style={{ fontWeight: 'normal' }}>{email}</label></label></td>
                                    <td> <label className={styles.input} style={{ fontWeight: 'bold', marginLeft: "30px" }}>Address    : <label style={{ fontWeight: 'normal' }}>{address}</label></label></td>
                                </tr>
                                <tr>
                                    <td><label className={styles.input} style={{ fontWeight: 'bold', marginLeft: "-30px" }}>District    : <label style={{ fontWeight: 'normal' }}>{district}</label></label></td>
                                    <td><label className={styles.input} style={{ fontWeight: 'bold', marginLeft: "30px" }}>Postal/Zip Code    : <label style={{ fontWeight: 'normal' }}>{zipCode}</label></label></td>
                                </tr>
                            </table>

                            <table style={{ marginBottom: "50px", marginTop: "20px" }}>
                                <tr>
                                    <td><button onClick={UpdateDetails} type='button' className={styles.green_btn}>Update</button></td>
                                    <td><button onClick={DeleteAccount} type='button' className={styles.green_btn}>Delete Account</button></td>
                                    <td><button onClick={Logout} type='button' className={styles.green_btn}>Log Out</button></td>
                                </tr>
                            </table>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default UserProfile;


