import styles from './style.module.css';

import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `http://localhost:5050/user/password-reset`;
			const { data } = await axios.post(url, { email });
			setMsg(data.message);
			setError("");
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				setMsg("");
			}
		}
	};

	return (
		<div className={styles.container}>
			<form className={styles.form_container} onSubmit={handleSubmit}>
				<h1>Forgot Password</h1>

				<label style={{marginLeft: '-320px' , fontWeight:"bold"}}>Email    :</label>
				<input
					type="email"
					placeholder="someone@gmail.com"
					name="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					required
					className={styles.input}
				/>

                {/* display invalid email message */}
				{error && <div className={styles.error_msg}>{error}</div>}
                {/* display reset password link send successfully */}
				{msg && <div className={styles.success_msg}>{msg}</div>}

				<button type="submit" className={styles.g_btn}>
					Send Verification
				</button>
			</form>
		</div>
	);
};

export default ForgotPassword;