import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "./styles.module.css";
import { faHeart, faListAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavBarGoGo from "../../navigatonBar/navbarGoGo";

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
    const [FilteredUser, setFilteredUser] = useState([]);

    var [sessionUser, setSessionUser] = useState([]);

    const getUserDetailsByID = async () => {

        //get the user details from the session
        const user = JSON.parse(sessionStorage.getItem("loggeduser"));
        console.log("User Details", user);
        console.log("User id", user._id);

        try {
            const response = await axios.get('http://localhost:5050/user/' + user._id);
            // const response = await axios.get('http://localhost:5050/user/' + props.match.params.id);
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
        const user = JSON.parse(sessionStorage.getItem("loggeduser"));
        // create session
        window.sessionStorage.setItem(
            "loggeduser",
            JSON.stringify(user)
        );
        window.location = '/update-user-profile';
    }

    const DeleteAccount = (id) => {

        const confirmBox = window.confirm(
            "Are you sure want to delete your account?"
        )
        if (confirmBox === true) {
            axios.delete("http://localhost:5050/user/" + id)
                .then((res) => {
                    alert("Successfully deleted");
                    // window.location = '/';
                    const modified = FilteredUser.filter(user => user._id !== id);
                    setFilteredUser(modified);
                });
            console.log('a', id)
            window.location = '/';
        }
    }

    const Logout = () => {
        window.location = '/';
        sessionStorage.clear();
    }

    return (
        <div>
            <NavBarGoGo />
            <div className={styles.background} >
                <div className={styles.cartDetails_container} style={{ backgroundColor: "white", width: "100%" }}>

                    {/* cart and History Details */}

                    <table style={{ marginLeft: "1000px", marginTop: "30px" }}>
                        <tr >
                            <td><Link to="/fav/view/" className={styles.ReviewBtn}><FontAwesomeIcon icon={faHeart} /> Favorite Items</Link></td>
                            <td><Link to="/order-history" className={styles.ReviewBtn} style={{ marginLeft: "20px" }}><FontAwesomeIcon icon={faListAlt} /> Order History</Link></td>
                        </tr>
                    </table>
                </div>
                <div className={styles.profile_container}>
                    <div className={styles.profile_form_container}>

                        <div className={styles.left}>
                            <h2 style={{ color: "white", textAlign: "center" }}> Welcome<br></br> {firstName} {lastName}</h2><br></br>
                            <img style={{ width: "220px", height: "220px" }} src={image} alt=""></img>
                        </div>

                        <div className={styles.right}>
                            <form className={styles.form_container}>



                                <h1 style={{ marginTop: "50px", marginBottom: "30px" }}>Account Details</h1>

                                <table>
                                    <thead></thead>
                                    <tbody>
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
                                    </tbody>
                                </table>

                                <table style={{ marginBottom: "50px", marginTop: "20px" }}>
                                    <thead></thead>
                                    <tbody>
                                        <tr>
                                            <td><button onClick={UpdateDetails} type='button' className={styles.g_button}>Update</button></td>
                                            <td><button onClick={() => DeleteAccount(props.match.params.id)} type='button' className={styles.g_button}>Delete Account</button></td>
                                            <td><button onClick={Logout} type='button' className={styles.logout_button}>Log Out</button></td>
                                        </tr>
                                    </tbody>
                                </table>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;


