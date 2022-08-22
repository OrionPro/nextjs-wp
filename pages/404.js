import Link from 'next/link'
import styles from "../styles/Home.module.css";

export default function FourOhFour() {
	return <div className={`${styles.container} ${styles.containerCenter}`}>
				<h1>404 - Page Not Found</h1>
				<p>Custom 404 Page</p>
				<Link href="/">
					<a>
						Go back home
					</a>
				</Link>
			</div>

}