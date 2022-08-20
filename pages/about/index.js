import styles from "../../styles/Home.module.css";
import stylesBlog from "../../styles/Blog.module.css";

function Index() {
	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<h1>About</h1>
				<div className={stylesBlog.linkBack}>
					<a href="/" className={styles.default}>Back</a>
				</div>
			</main>
		</div>
	)
}

export default Index