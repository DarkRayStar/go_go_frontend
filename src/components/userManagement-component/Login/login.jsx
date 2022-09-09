import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.css';
import axios from 'axios';
import LoginNavBarGoGo from '../../navigatonBar/loginNav';

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
            console.log("user 2 Details", res.user);
            console.log("user ID", res.user._id);
            alert(res.message);

            // create session
            window.sessionStorage.setItem(
                "loggeduser",
                JSON.stringify(res.user)
              );
            window.location = "/user-profile";

            // window.location = `/user-profile/${res.user._id}`
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

    const registerButton = () => {
        window.location = '/registration';
    }

    const forgotpass = () => {
        window.location = '/forgot-password';
    }

    return (
        <div>
            <LoginNavBarGoGo/>
            <div className={styles.login_container}>
                <div className={styles.login_form_container}>

                    <div className={styles.left}>

                        <form className={styles.form_container} onSubmit={handleSubmit}>
                            <h1>Login Here</h1>

                            <label style={{ marginLeft: '-330px' , fontWeight:"bold"}}>Email </label>
                            <input
                                type="email"
                                placeholder='someone@gmail.com'
                                name='email'
                                onChange={handleChange}
                                value={data.email}
                                required
                                className={styles.input}
                            />

                            <label style={{ marginLeft: '-300px' , fontWeight:"bold"}}>Password  </label>
                            <input
                                type="password"
                                placeholder='Password'
                                name='password'
                                onChange={handleChange}
                                value={data.password}
                                required
                                className={styles.input}
                            />

                            {/* <Link to="/forgot-password" style={{ marginLeft: '85px', alignSelf: "flex-start" }}> */}
                                <p onClick={forgotpass} style={{textDecoration:"underline", color:'Blue', cursor: 'pointer' ,marginLeft: '110px', alignSelf: "flex-start", padding: "0 15px" }}>Forgot Password ?</p>
                            {/* </Link> */}

                            {/* {error && <div className={styles.err_msg}>{error}</div>} */}
                            {error && <div className={styles.err_msg}>{error}</div>}

                            <button type='submit' className={styles.g_button}>Sign in</button>
                        </form>
                    </div>

                    <div className={styles.right}>
                        <h1 style={{ textAlign: 'center' }}>Don't have an Account?</h1>
                        {/* <Link to="/registration"> */}
                            <button type='button' onClick={registerButton} className={styles.w_button}>Sign up</button>
                        {/* </Link> */}

                    </div>

                </div>
            </div>
        </div>
    )
};

export default SignIn;