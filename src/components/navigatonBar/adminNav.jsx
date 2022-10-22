import styles from "./style.module.css";


function AdminNavBarGoGo() {

	const logoutButton = () => {
		window.location = '/';
		sessionStorage.clear();
	}


	return (
		<header className="fixed-top" >
			<div className={styles.main_container}>
				<nav className={styles.navbar}>
					<h1 style={{ color: "white", marginLeft: '20px' }}>Go Go Gadgets Store</h1>
					<nav>
						<a href='#'>DASHBOARD</a>
						<a href='#'>ABOUT US</a>
						<a href='#' onClick={logoutButton}>LOGOUT</a>
					</nav>
				</nav>
			</div>
		</header>

	);
};

export default AdminNavBarGoGo;
