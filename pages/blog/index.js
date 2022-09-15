import styles from "../../styles/Home.module.css";
import stylesBlog from "../../styles/Blog.module.css";
import Image from 'next/image';
import { Markup } from 'react-render-markup';
import Link from 'next/link'
import {useCallback, useEffect, useRef, useState} from "react";


function Index({ posts }) {
	console.log('posts', posts)
	let y = useRef(0).current;
	//Detect scroll direction in React js
	const handleNavigation = useCallback(
		e => {
			if(typeof window !== "undefined") {
				if (y > window.scrollY) {
					console.log("scrolling up");
				} else if (y < window.scrollY) {
					console.log("scrolling down");
				}
				y = window.scrollY;
			}
		}, [y]
	);

	useEffect(() => {
		if(typeof window !== "undefined") {
			y = window.scrollY;
		}
		window.addEventListener('scroll', handleNavigation);
		return () => {
			window.removeEventListener('scroll', handleNavigation);
		};
	},[]);


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
// Обычно тут используем getStaticProps
// для того чтобы на серваке брались новые данные в api как на dev версии надо юзать getServerSideProps. А так на серваке надо делать deploy т.е. новый build
// И можно юзать кеширование https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props
// Для чего то динамичного в компоненте можно юзать data fetching with SWR (React hook SWR) https://nextjs.org/docs/basic-features/data-fetching/client-side
//export async function getServerSideProps({req, res}) {
export async function getStaticProps() {
	// res.setHeader(
	// 	'Cache-Control',
	// 	'public, s-maxage=10, stale-while-revalidate=59'
	// )

	const result = await fetch('https://kuhni.orionpro.in/wp-json/wp/v2/posts?_fields=fimg_url,author,id,excerpt,title,link,featured_media_src_url,featured_media', {
		headers: {
			'Accept': 'application/json',
			'Content-type' : 'application/json',
			'Content-Disposition': 'attachment',
			Authorization: `Bearer ${process.env.JWT_TOKEN}`
		},
	})

	const data = await result.json()

	console.log('blog data', data);

	return {
		props: {
			posts: data,
		},
	}
}

export default Index
