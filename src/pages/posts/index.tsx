import { GetStaticProps } from 'next'
import React from 'react'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import Link from 'next/link'
import styles from './posts.module.scss'
import { getPrismicClient } from '../../services/prismic'
import Head from 'next/head'

interface Post {
	id: string
	title: string
	excerpt: string
	updateAt: string
}

interface PostsProps {
	posts: Post[]
}

interface PrismicDocumentTitle {
	type: string
	text: string
}

interface PrismicDocumentContent {
	type: string
	text: string
}

interface PrismicDocument {
	uid: string
	last_publication_date: string
	data: {
		title: PrismicDocumentTitle[]
		content: PrismicDocumentContent[]
	}
}

export default function Posts({ posts }: PostsProps) {
	return (
		<>
			<Head>
				<title>Posts | Open Source for Juniors</title>
			</Head>
			<main className={styles.container}>
				<div className={styles.posts}>
					{posts.map(post => (
						<Link href={`/posts/${post.id}`} key={post.id}>
							<a>
								<time>{post.updateAt}</time>
								<strong>{post.title}</strong>
								<p>{post.excerpt}</p>
							</a>
						</Link>
					))}
				</div>
			</main>
		</>
	)
}

export const getStaticProps: GetStaticProps = async (): Promise<any> => {
	const prismic = getPrismicClient()

	const response = await prismic.query([Prismic.predicates.at('document.type', 'post')], {
		fetch: ['post.title', 'post.content']
	})

	const posts = response.results.map(post => {
		const document = post as PrismicDocument

		setTimeout(() => {
			return {
				id: document.uid,
				title: RichText.asText(document.data.title),
				excerpt: document.data.content.find(content => content.type === 'paragraph')?.text ?? '',
				updateAt: new Date(document.last_publication_date).toLocaleDateString('pt-BR', {
					day: '2-digit',
					month: 'long',
					year: 'numeric'
				})
			}
		}, 1000)
	})

	return {
		props: {
			posts
		}
	}
}
