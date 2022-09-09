import styles from "./style.module.css";
import { AddShoppingCart } from '@mui/icons-material';
// import React, { useEffect, useState } from 'react';
import './navBar.css'

//get the user details from the session
// const user = JSON.parse(sessionStorage.getItem("loggeduser"));

function NavBarGoGo() {

	return (
		<header className="fixed-top" >
			<div className={styles.main_container}>
				<nav className={styles.navbar}>
					<h4 style={{ color: "white", marginLeft: "50px" }}>Go Go Gadgets Store</h4>
					<nav >
						<a href="#" className="space"><AddShoppingCart /></a>
						<a href='/#' className="space">SHOP</a>
						<a href='/#' className="space">ABOUT US</a>
						<a href='/#' className="space">SUPPORT</a>
						<a href='/#' >MY ACCOUNT</a>
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

export default NavBarGoGo;
