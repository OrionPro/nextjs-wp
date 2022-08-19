import styles from "../../styles/Home.module.css";

function Index() {
	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<div>About</div>
				<a href="/" className={styles.default}>Back</a>
			</main>
		</div>
	)
}

export default Index