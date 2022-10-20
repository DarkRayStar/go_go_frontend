import styles from "./style.module.css";

//get the user details from the session
function AdminNavBarGoGo() {

	return (
		<header className="fixed-top" >
			<div className={styles.main_container}>
				<nav className={styles.navbar}>
					<h1 style={{ color: "white", marginLeft: '20px' }}>Go Go Gadgets Store</h1>
					<nav>
						<a href='/#'>DASHBOARD</a>
						<a href='/#'>ABOUT US</a>
						<a href='/'>LOGOUT</a>
					</nav>
				</nav>
			</div>
		</header>

	);
};

export default AdminNavBarGoGo;
