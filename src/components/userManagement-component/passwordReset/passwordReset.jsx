import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import { PWDRequiesite } from "./PWDRequiesite";
import "./style.css";

export default function PasswordReset() {

	const [validUrl, setValidUrl] = useState(false);
	const [password, setPassword] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");
	const param = useParams();
	const url = `http://localhost:5050/user/password-reset/${param.id}/${param.token}`;

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

	//check valid URL or not
	useEffect(() => {
		const verifyUrl = async () => {
			try {
				await axios.get(url);
				setValidUrl(true);
			} catch (error) {
				setValidUrl(false);
			}
		};
		verifyUrl();
	}, [param, url]);


	const onsubmit = async (e) => {

		e.preventDefault();

		try {

			const { data } = await axios.post(url, { password });
			setMsg(data.message);
			setError("");
			window.location = "/";

		}
		catch (error) {

			if (error.response && error.response.status >= 400 && error.response.status <= 500) {
				setError(error.response.data.message);
				setMsg("");
			}

		}
	};


	return (

		<Fragment>

			{validUrl ? (

				// <div style={{ marginTop: "-100px", marginLeft: "-200px" }} className={styles.container}>

				// 	<form className={styles.form_container} onSubmit={onsubmit}>

				// 		<h1>Add New Password</h1>

				// 		{/* <input
				// 			type="password"
				// 			placeholder="Password"
				// 			name="password"
				// 			pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
				// 			title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
				// 			onChange={(e) => setPassword(e.target.value)}
				// 			value={password}
				// 			required
				// 			className={styles.input}
				// 		/> */}

				// 		<div>
				// 			<label htmlFor="password">Password</label>
				// 			<input
				// 				id="password"
				// 				type="password"
				// 				placeholder='Ex: Password'
				// 				name='password'
				// 				value={password}
				// 				onChange={(e) => setPassword(e.target.value)}
				// 				onFocus={handleOnFocus}
				// 				onBlur={handleOnBlur}
				// 				onKeyUp={handleOnKeyUp}
				// 				className={styles.input}
				// 				required

				// 			/>
				// 		</div>
				// 		{pwdRequisite ? <PWDRequiesite
				// 			capsLetterCheckFlag={checks.capsLetterCheck ? "valid" : "invalid"}
				// 			numberCheckFlag={checks.numberCheck ? "valid" : "invalid"}
				// 			pwdLengthCheckFlag={checks.pwdLengthCheck ? "valid" : "invalid"}
				// 			specialCharacterCheckFlag={checks.specialCharacterCheck ? "valid" : "invalid"}
				// 		/> : null}

				// 		{/* display invalid password message */}
				// 		{error && <div className={styles.err_msg}>{error}</div>}
				// 		{/* display password reset success message */}
				// 		{msg && <div className={styles.success_msg}>{msg}</div>}

				// 		<button type="submit" className={styles.g_button}>
				// 			Submit
				// 		</button>

				// 	</form>



				// 	{/* aaaaaaaaaaaaaaaaaaa */}


				// </div>

				<div className={styles.container}>
					<form className={styles.form_container} onSubmit={onsubmit}>
						<h1>Add New Password</h1>

						<label style={{ marginLeft: '-290px' , fontWeight:"bold" }}>Password    :</label>
						<input
							id="password"
							type="password"
							placeholder='Ex: Password'
							name='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
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

							{/* display invalid password message */}
							{error && <div className={styles.err_msg}>{error}</div>}
							{/* display password reset success message */}
							{msg && <div className={styles.success_msg}>{msg}</div>}

							<button type="submit" className={styles.g_btn}>
								Reset Password
							</button>
						</form>
				</div>


			) : (

				<h1>404 Not Found</h1>

			)}

		</Fragment>
	)
}
