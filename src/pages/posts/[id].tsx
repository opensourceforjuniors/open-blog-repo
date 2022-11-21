import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { RichText } from 'prismic-dom'
import { getPrismicClient } from '../../services/prismic'
import styles from './post.module.scss'

interface PostProps {
	post: {
		slug: string
		title: string
		content: string
		updatedAt: string
	}
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
	data: {
		title: PrismicDocumentTitle[]
		content: PrismicDocumentContent[]
	}
}

export default function Post({ post }: PostProps) {
	const router = useRouter()

	if (router.isFallback) {
		return <p>Loading...</p>
	}

	return (
		<>
			<Head>
				<title>Post | Open Source for Juniors</title>
			</Head>
			<main className={styles.container}>
				<article className={styles.post}>
					<h1>{post.title}</h1>
					<div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content }} />
				</article>
			</main>
		</>
	)
}

export const getStaticPaths: GetStaticPaths = async (): Promise<any> => {
	return {
		paths: [],
		fallback: true
	}
}

export const getStaticProps: GetStaticProps = async (context): Promise<any> => {
	const { id } = context.params as { id: string }
	const prismic = getPrismicClient()
	const response = await prismic.getByUID('post', String(id), {})
	const document = response as PrismicDocument
	const post = {
		id,
		title: RichText.asText(document.data.title),
		content: RichText.asHtml(document.data.content)
	}
	return {
		props: {
			post
		}
	}
}
