import styles from "../../styles/Home.module.css";
import stylesBlog from "../../styles/Blog.module.css";
import Image from 'next/image';
import { Markup } from 'react-render-markup';
import Link from 'next/link'


function Index({ posts }) {
	console.log('posts', posts)

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<h1>Blog</h1>
				<div className={stylesBlog.linkBack}>
					<Link href="/" >
						<a className={styles.default}>Back</a>
					</Link>
				</div>
				<div className={stylesBlog.posts}>
					{
						posts.map(item => {
							return (

									<Link key={item.id} href={`/posts/${item.id}`}>
										<div className={stylesBlog.post} >
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
									</Link>

							)
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

	const data = await res.json()

	console.log('blog data', data);

	return {
		props: {
			posts: data,
		},
	}
}

export default Index
