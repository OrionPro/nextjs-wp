import styles from "../../styles/Home.module.css";
import stylesBlog from "../../styles/Blog.module.css";
import Image from 'next/image';
import { Markup } from 'react-render-markup';


function Index({ posts }) {
	console.log('posts', posts)

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<h1>Blog</h1>
				<div className={stylesBlog.linkBack}>
					<a href="/" className={styles.default}>Back</a>
				</div>
				<div className={stylesBlog.posts}>
					{
						posts.map(item => {
							return <div className={stylesBlog.post} key={item.id}>
								<div className={stylesBlog.postThumbnail}>
									{
										<Image src={item.fimg_url} alt='' layout='fill'/>
									}
								</div>
								<h3>
									{
										item.title.rendered
									}
								</h3>
								<div className={stylesBlog.postContent}>
									<Markup markup={item.excerpt.rendered} />
								</div>
							</div>
						})
					}
				</div>
			</main>
		</div>
	)
}

export async function getStaticProps() {

	const res = await fetch('https://kuhni.orionpro.in/wp-json/wp/v2/posts?_fields=fimg_url,author,id,excerpt,title,link,featured_media_src_url,featured_media', {
		headers: {
			'Accept': 'application/json',
			'Content-type' : 'application/json',
			'Content-Disposition': 'attachment',
			Authorization: `Bearer ${process.env.JWT_TOKEN}`
		},
	})
	console.log('res', res)

	const json = await res.json()

	return {
		props: {
			posts: json,
		},
	}
}

export default Index
