import styles from "./style.module.css";
// import React, { useEffect, useState } from 'react';

//get the user details from the session
// const user = JSON.parse(sessionStorage.getItem("loggeduser"));

function AdminNavBarGoGo() {

	return (
		<header className="fixed-top" >
			<div className={styles.main_container}>
				<nav className={styles.navbar}>
					<h1 style={{ color: "white" }}>Go Go Gadgets Store</h1>
					<nav>
						<a href='/#'>DASHBOARD</a>
						<a href='/#'>ABOUT US</a>
						<a href='/#'>MY ACCOUNT</a>
						{/* <a href="/user-profile"><img style={{ width: "35px", height: "35px", borderRadius: '50px', marginRight: "20px" }} src={user.image} alt=""></img></a> */}
					</nav>
					{/* <button className={styles.w_button} onClick={handleLogout}>
					Logout
				</button> */}
					{/* <h1><img style={{ width: "35px", height: "35px", borderRadius: '50px', marginRight: "20px" }} src={user.image} alt=""></img></h1> */}
				</nav>
			</div>
		</header>

	);
};

export default AdminNavBarGoGo;
