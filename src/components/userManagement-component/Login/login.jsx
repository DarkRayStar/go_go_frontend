import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.css';
import axios from 'axios';

const SignIn = () => {

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = "http://localhost:5050/user/login";
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("token", res.data);
            console.log("login", res.message);
            alert(res.message);
            // window.location = "/homepage"
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
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>

                <div className={styles.left}>

                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Login Here</h1>

                        <label>Email  <input
                            type="email"
                            placeholder='Ex: someone@gmail.com'
                            name='email'
                            onChange={handleChange}
                            value={data.email}
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

                        <Link to="/forgot-password" style={{ marginLeft: '85px', alignSelf: "flex-start" }}>
                            <p style={{ padding: "0 15px" }}>Forgot Password ?</p>
                        </Link>

                        {/* {error && <div className={styles.error_msg}>{error}</div>} */}
                        {error && <div className={styles.error_msg}>{error}</div>}

                        <button type='submit' className={styles.register_btn}>Sign in</button>
                    </form>
                </div>

                <div className={styles.right}>
                    <h1>Don't have an Account?</h1>
                    <Link to="/registration">
                        <button type='button' className={styles.register_btn}>Sign up</button>
                    </Link>

                </div>

            </div>
        </div>
    )
};

export default SignIn;