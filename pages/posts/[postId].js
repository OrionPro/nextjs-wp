import styles from "../../styles/Home.module.css";
import stylesBlog from "../../styles/Blog.module.css";
import Image from "next/image";
import {Markup} from "react-render-markup";
import { useRouter } from 'next/router'

function Index({ post }) {
	console.log('post', post)
	const router = useRouter();

	if(router.isFallback) {
		return (
			<h1>Loading...</h1>
		)
	}

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

	const paths = data.slice(0, 1).map((post) => { // Если изначально сделать маленькое количество тут, то оно сделает такое же количество страниц в .next\server\pages\posts\ после билда, т.е. если мы не хотим чтобы много страниц оно билдило в начале. Потом подгрузятся остальные, те что будут видимые на странице, при скролле будут подгружаться остальные и создаваться в .next\server\pages\posts\  

		return {
			params: {
				postId: `${post.id}`,
			}
		}
	})

	return {
		paths,
		fallback: true,
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

	const data = await res.json();

	if(!data.id) {
		return {
			notFound: true // это если мы ставим fallback true , чтобы если такого поста нет, то перешло на страницу 404
		}
	}

	console.log('postId.js json', data) // Это будет видно только в дебаггере если запустить yarn if_need_inspect_in_dev потому что включится inspect режим и будет написно в консоле Debugger listening on таком то порту и если туда нажать то мы попадём в дебаггер, либо https://nextjs.org/docs/advanced-features/debugging#server-side-code  там написано про chrome://inspect и что там тоже можно увидеть то, что будет видно в phpstorm при переходе по  Debugger listening on. Но то что происходит в getStaticPaths в консоле я не смог увидеть даже в дебагере

	return {
		props: {
			post: data,
		},
	}
}

export default Index