import { useState } from "react";
import { Link } from 'react-router-dom';
import styles from './style.module.css';
import axios from 'axios';
import { PWDRequiesite } from "./PWDRequiesite";
import "./style1.css";
import { Col, Container, Row } from "react-bootstrap";


const Registration = () => {


    const options = ["Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya", "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee", "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla", "Moneragala", "Ratnapura", "Kegalle"];
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        mobileNumber: "",
        phoneNumber: "",
        address: "",
        district: options[0],
        zipCode: "",
        email: "",
        password: "",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMDoZqGk6An-DWrwWp2AQ1a2aug6xZ_IQSQWMO-1Cj1p0mwr2lPHLNWGbQknO-671N5es&usqp=CAU"
    });


    const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };


    // const [Password, setPassword] = useState("");
    const [pwdRequisite, setPWDRequisite] = useState(false);
    const [checks, setChecks] = useState({
        capsLetterCheck: false,
        numberCheck: false,
        pwdLengthCheck: false,
        specialCharacterCheck: false,
    });

    // const handleOnChange = (e) => {
    //     setPassword(e.target.value);
    // };

    const handleOnFocus = () => {
        setPWDRequisite(true);
    };

    const handleOnBlur = () => {
        setPWDRequisite(false);
    };

    const handleOnKeyUp = (e) => {
        const { value } = e.target;
        const capsLetterCheck = /[A-Z]/.test(value);
        const numberCheck = /[0-9]/.test(value);
        const pwdLengthCheck = value.length > 8;
        const specialCharacterCheck = /[!@#$%^&*]/.test(value);
        setChecks({
            capsLetterCheck,
            numberCheck,
            pwdLengthCheck,
            specialCharacterCheck,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = "http://localhost:5050/user/registration";
            const { data: res } = await axios.post(url, data);
            // navigate("/")
            window.location = "/"
            alert(res.message);
            console.log("registration", res.message);
        }
        catch (error) {

            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    }



    return (
        <div >
            {/* <h1>Password Validation</h1>

            <div>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="text"
                    value={data.Password}
                    onChange={handleChange}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    onKeyUp={handleOnKeyUp}
                />
            </div>
            {pwdRequisite ? <PWDRequiesite
                capsLetterCheckFlag={checks.capsLetterCheck ? "valid" : "invalid"}
                numberCheckFlag={checks.numberCheck ? "valid" : "invalid"}
                pwdLengthCheckFlag={checks.pwdLengthCheck ? "valid" : "invalid"}
                specialCharacterCheckFlag={checks.specialCharacterCheck ? "valid" : "invalid"}
            /> : null} */}



            {/* aaaaaaaaaaaaaaaaaaaaa */}
            <div className={styles.signup_container}>
                <div className={styles.signup_form_container}>

                    <div className={styles.left}>
                        <h1 style={{ textAlign: 'center' }}>Already have an Account?</h1>
                        <Link to="/">
                            <button type='button' className={styles.w_button}>Sign in</button>
                        </Link>
                    </div>

                    <div className={styles.right}>

                        <form className={styles.form_container} onSubmit={handleSubmit}>
                            <h1 style={{ marginTop: "50px" }}>Create Account</h1>

                            {/* <table style={{marginLeft:"260px"}}>
                                <tr>
                                    <td><label style={{ marginLeft: '-290px' }}>First Name    :</label>
                                        <input
                                            type="text"
                                            placeholder='John'
                                            name='firstName'
                                            onChange={handleChange}
                                            value={data.firstName}
                                            required
                                            className={styles.input}
                                        /></td>
                                    <td><label style={{ marginLeft: '10px' }}>Last Name    :</label>
                                        <input
                                            type="text"
                                            placeholder='Ex: Smith'
                                            name='lastName'
                                            onChange={handleChange}
                                            value={data.lastName}
                                            required
                                            className={styles.input}
                                        /></td>
                                </tr>
                                <tr>
                                    <td><label style={{ marginLeft: '-255px' }}>Mobile Number    :</label>
                                        <input
                                            type="text"
                                            placeholder='Ex: 0712345678'
                                            name='mobileNumber'
                                            onChange={handleChange}
                                            value={data.mobileNumber}
                                            required
                                            className={styles.input}
                                        /></td>
                                    <td><label style={{ marginLeft: '-265px' }}>Phone Number    :</label>
                                        <input
                                            type="text"
                                            placeholder='Ex: 0812345678'
                                            name='phoneNumber'
                                            onChange={handleChange}
                                            value={data.phoneNumber}
                                            required
                                            className={styles.input}
                                        /></td>
                                </tr>
                                <tr>
                                    <td> <label style={{ marginLeft: '-330px' }}>Email    :</label>
                                        <input
                                            type="email"
                                            placeholder='Ex: someone@gmail.com'
                                            name='email'
                                            onChange={handleChange}
                                            value={data.email}
                                            required
                                            className={styles.input}
                                        /></td>
                                    <td><label style={{ marginLeft: '-310px' }}>Address    :</label>
                                        <input
                                            type="text"
                                            placeholder='Ex: No:170/A, Kandy'
                                            name='address'
                                            onChange={handleChange}
                                            value={data.address}
                                            required
                                            className={styles.input}
                                        /></td>
                                </tr>
                                <tr>
                                    <td><label style={{ marginLeft: '-315px' }}>District    :</label>
                                        <select
                                            className={styles.input}
                                            // value={selected}
                                            name='district'
                                            value={data.district}
                                            onChange={handleChange}>

                                            {options.map((value) => (
                                                <option value={value} key={value}>
                                                    {value}
                                                </option>
                                            ))}
                                        </select></td>
                                    <td><label style={{ marginLeft: '-255px' }}>Postal/Zip Code    :</label>
                                        <input
                                            type="text"
                                            placeholder='Ex: 00000'
                                            name='zipCode'
                                            onChange={handleChange}
                                            value={data.zipCode}
                                            required
                                            className={styles.input}
                                        /></td>
                                </tr>
                            </table> */}

                            {/* <label style={{ marginLeft: '-290px' }}>First Name    :</label>
                            <input
                                type="text"
                                placeholder='Ex: John'
                                name='firstName'
                                onChange={handleChange}
                                value={data.firstName}
                                required
                                className={styles.input}
                            />

                            <label style={{ marginLeft: '-290px' }}>Last Name    :</label>
                            <input
                                type="text"
                                placeholder='Ex: Smith'
                                name='lastName'
                                onChange={handleChange}
                                value={data.lastName}
                                required
                                className={styles.input}
                            />

                            <label style={{ marginLeft: '-255px' }}>Mobile Number    :</label>
                            <input
                                type="text"
                                placeholder='Ex: 0712345678'
                                name='mobileNumber'
                                onChange={handleChange}
                                value={data.mobileNumber}
                                required
                                className={styles.input}
                            />

                            <label style={{ marginLeft: '-265px' }}>Phone Number    :</label>
                            <input
                                type="text"
                                placeholder='Ex: 0812345678'
                                name='phoneNumber'
                                onChange={handleChange}
                                value={data.phoneNumber}
                                required
                                className={styles.input}
                            />

                            <label style={{ marginLeft: '-330px' }}>Email    :</label>
                            <input
                                type="email"
                                placeholder='Ex: someone@gmail.com'
                                name='email'
                                onChange={handleChange}
                                value={data.email}
                                required
                                className={styles.input}
                            />

                            <label style={{ marginLeft: '-310px' }}>Address    :</label>
                            <input
                                type="text"
                                placeholder='Ex: No:170/A, Kandy'
                                name='address'
                                onChange={handleChange}
                                value={data.address}
                                required
                                className={styles.input}
                            />

                            <label style={{ marginLeft: '-315px' }}>District    :</label>
                            <select
                                className={styles.input}
                                // value={selected}
                                name='district'
                                value={data.district}
                                onChange={handleChange}>

                                {options.map((value) => (
                                    <option value={value} key={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>

                            <label style={{ marginLeft: '-255px' }}>Postal/Zip Code    :</label>
                            <input
                                type="text"
                                placeholder='Ex: 00000'
                                name='zipCode'
                                onChange={handleChange}
                                value={data.zipCode}
                                required
                                className={styles.input}
                            /> */}

                            <div>
                                {/* <label htmlFor="password">Password</label> */}
                                {/* <label >Password    :</label><br></br>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder='Ex: Password'
                                    name='password'
                                    value={data.Password}
                                    onChange={handleChange}
                                    onFocus={handleOnFocus}
                                    onBlur={handleOnBlur}
                                    onKeyUp={handleOnKeyUp}
                                    className={styles.input}
                                    required

                                /> */}
                            </div>
                            {/* {pwdRequisite ? <PWDRequiesite
                                capsLetterCheckFlag={checks.capsLetterCheck ? "valid" : "invalid"}
                                numberCheckFlag={checks.numberCheck ? "valid" : "invalid"}
                                pwdLengthCheckFlag={checks.pwdLengthCheck ? "valid" : "invalid"}
                                specialCharacterCheckFlag={checks.specialCharacterCheck ? "valid" : "invalid"}
                            /> : null} */}

                            <Container>
                                <Row>
                                    <Col xs={9} md={6}>
                                        <label style={{ fontWeight: "bold" }}>First Name    :</label><br></br>
                                        <input
                                            type="text"
                                            placeholder='Your First Name'
                                            name='firstName'
                                            onChange={handleChange}
                                            value={data.firstName}
                                            required
                                            className={styles.input}
                                        />
                                    </Col>
                                    <Col xs={9} md={6}>
                                        <label style={{ fontWeight: "bold" }}>Last Name    :</label><br></br>
                                        <input
                                            type="text"
                                            placeholder='Your Last name'
                                            name='lastName'
                                            onChange={handleChange}
                                            value={data.lastName}
                                            required
                                            className={styles.input}
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={9} md={6}>
                                        <label style={{ fontWeight: "bold" }}>Mobile Number    :</label><br></br>
                                        <input
                                            type="text"
                                            placeholder='Mobile Number'
                                            name='mobileNumber'
                                            onChange={handleChange}
                                            value={data.mobileNumber}
                                            required
                                            className={styles.input}
                                        />
                                    </Col>
                                    <Col xs={9} md={6}>
                                        <label style={{ fontWeight: "bold" }}>Phone Number    :</label><br></br>
                                        <input
                                            type="text"
                                            placeholder='Phone Number'
                                            name='phoneNumber'
                                            onChange={handleChange}
                                            value={data.phoneNumber}
                                            required
                                            className={styles.input}
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={9} md={6}>
                                        <label style={{ fontWeight: "bold" }} >Email Address    :</label><br></br>
                                        <input
                                            type="email"
                                            placeholder='someone@gmail.com'
                                            name='email'
                                            onChange={handleChange}
                                            value={data.email}
                                            required
                                            className={styles.input}
                                        />
                                    </Col>
                                    <Col xs={9} md={6}>
                                        <label style={{ fontWeight: "bold" }} >Address    :</label><br></br>
                                        <input
                                            type="text"
                                            placeholder='No:170/A, Kandy'
                                            name='address'
                                            onChange={handleChange}
                                            value={data.address}
                                            required
                                            className={styles.input}
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={9} md={6}>
                                        <label style={{ fontWeight: "bold" }} >District    :</label><br></br>
                                        <select
                                            className={styles.input}
                                            // value={selected}
                                            name='district'
                                            value={data.district}
                                            onChange={handleChange}>

                                            {options.map((value) => (
                                                <option value={value} key={value}>
                                                    {value}
                                                </option>
                                            ))}
                                        </select>
                                    </Col>
                                    <Col xs={9} md={6}>
                                        <label style={{ fontWeight: "bold" }} >Postal/Zip Code    :</label><br></br>
                                        <input
                                            type="text"
                                            placeholder='00000'
                                            name='zipCode'
                                            onChange={handleChange}
                                            value={data.zipCode}
                                            required
                                            className={styles.input}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ textAlign: "center" }}>
                                        {/* <label htmlFor="password">Password</label> */}
                                        <label style={{ fontWeight: "bold" }}>Password    :</label><br></br>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder='Password'
                                            name='password'
                                            value={data.Password}
                                            onChange={handleChange}
                                            onFocus={handleOnFocus}
                                            onBlur={handleOnBlur}
                                            onKeyUp={handleOnKeyUp}
                                            className={styles.input}
                                            required

                                        />
                                        {pwdRequisite ? <PWDRequiesite
                                            capsLetterCheckFlag={checks.capsLetterCheck ? "valid" : "invalid"}
                                            numberCheckFlag={checks.numberCheck ? "valid" : "invalid"}
                                            pwdLengthCheckFlag={checks.pwdLengthCheck ? "valid" : "invalid"}
                                            specialCharacterCheckFlag={checks.specialCharacterCheck ? "valid" : "invalid"}
                                        /> : null}
                                    </Col>
                                </Row>

                            </Container>

                            {error && <div className={styles.err_msg}>{error}</div>}

                            <button type='submit' style={{ marginBottom: "50px" }} className={styles.g_button}>Sign Up</button>
                        </form>
                    </div>

                </div>
            </div>



        </div>
    )
};

export default Registration;