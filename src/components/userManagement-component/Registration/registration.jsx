import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.css';
import axios from 'axios';

const SignUp = () => {

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
        password: ""
    });

    const [error, setError] = useState("");

    // const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = "http://localhost:5050/user/registration";
            const { data: res } = await axios.post(url, data);
            // navigate("/login")
            window.location = "/login"
            alert(res.message);
            console.log("registration", res.message);
        }
        catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    }

    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>

                <div className={styles.left}>
                    <h1>Already have an Account?</h1>
                    <Link to="/login">
                        <button type='button' className={styles.login_btn}>Sign in</button>
                    </Link>
                </div>

                <div className={styles.right}>

                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <label>First Name   <input
                            type="text"
                            placeholder='Ex: John'
                            name='firstName'
                            onChange={handleChange}
                            value={data.firstName}
                            required
                            className={styles.input}
                        /></label>

                        <label>Last Name   <input
                            type="text"
                            placeholder='Ex: Smith'
                            name='lastName'
                            onChange={handleChange}
                            value={data.lastName}
                            required
                            className={styles.input}
                        /></label>

                        <label>Mobile Number  <input
                            type="text"
                            placeholder='Ex: 0712345678'
                            name='mobileNumber'
                            onChange={handleChange}
                            value={data.mobileNumber}
                            required
                            className={styles.input}
                        /></label>

                        <label>Phone Number   <input
                            type="text"
                            placeholder='Ex: 0812345678'
                            name='phoneNumber'
                            onChange={handleChange}
                            value={data.phoneNumber}
                            required
                            className={styles.input}
                        /></label>

                        <label>Email   <input
                            type="email"
                            placeholder='Ex: someone@gmail.com'
                            name='email'
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                        /></label>

                        <label>Address   <input
                            type="text"
                            placeholder='Ex: No:170/A, Kandy'
                            name='address'
                            onChange={handleChange}
                            value={data.address}
                            required
                            className={styles.input}
                        /></label>

                        <label>District   <select
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
                        </select></label>

                        <label>Postal/Zip Code   <input
                            type="text"
                            placeholder='Ex: 00000'
                            name='zipCode'
                            onChange={handleChange}
                            value={data.zipCode}
                            required
                            className={styles.input}
                        /></label>

                        <label>Password   <input
                            type="password"
                            placeholder='Ex: Password'
                            name='password'
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
                        /></label>

                        {error && <div className={styles.error_msg}>{error}</div>}

                        <button type='submit' className={styles.register_btn}>Sign Up</button>
                    </form>
                </div>

            </div>
        </div>
    )
};

export default SignUp;