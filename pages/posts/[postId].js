import styles from "../../styles/Home.module.css";
import stylesBlog from "../../styles/Blog.module.css";
import Image from "next/image";
import {Markup} from "react-render-markup";

function Index({ post }) {
	console.log('post', post)

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<h1>
					{
						post.title.rendered
					}
				</h1>
				<div className={stylesBlog.postThumbnail}>
					<Image src={post.fimg_url} alt='' layout='fill'/>
				</div>
				<div className={stylesBlog.postContent}>
					<Markup markup={post.content.rendered} />
				</div>
			</main>
		</div>
	)
}

export async function getStaticPaths() {
	const res = await fetch(`https://kuhni.orionpro.in/wp-json/wp/v2/posts?_fields=id`, {
		headers: {
			'Accept': 'application/json',
			'Content-type' : 'application/json',
			'Content-Disposition': 'attachment',
			Authorization: `Bearer ${process.env.JWT_TOKEN}`
		},
	})

	const data = await res.json();

	const paths = data.map((post) => {

		return {
			params: {
				postId: `${post.id}`,
			}
		}
	})

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps(context) {

	const { params } = context;

	const res = await fetch(`https://kuhni.orionpro.in/wp-json/wp/v2/posts/${params.postId}`, {
		headers: {
			'Accept': 'application/json',
			'Content-type' : 'application/json',
			'Content-Disposition': 'attachment',
			Authorization: `Bearer ${process.env.JWT_TOKEN}`
		},
	})

	const json = await res.json()

	console.log('postId.js json', json) // Это будет видно только в дебаггере если запустить yarn if_need_inspect_in_dev потому что включится inspect режим и будет написно в консоле Debugger listening on таком то порту и если туда нажать то мы попадём в дебаггер, либо https://nextjs.org/docs/advanced-features/debugging#server-side-code  там написано про chrome://inspect и что там тоже можно увидеть то, что будет видно в phpstorm при переходе по  Debugger listening on. Но то что происходит в getStaticPaths в консоле я не смог увидеть даже в дебагере

	return {
		props: {
			post: json,
		},
	}
}

export default Index