import styles from "../../styles/Home.module.css";
import stylesBlog from "../../styles/Blog.module.css";
import Link from 'next/link'

function Index() {
	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<h1>About</h1>
				<div className={stylesBlog.linkBack}>
					<Link href="/" >
						<a className={styles.default}>Back</a>
					</Link>
				</div>
			</main>
		</div>
	)
}

export default Index