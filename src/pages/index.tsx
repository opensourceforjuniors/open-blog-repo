import Head from 'next/head'
import styles from '../styles/home.module.scss'

export default function Home() {
	return (
		<>
			<Head>
				<title>Home | Open Source for Juniors</title>
			</Head>
			<main className={styles.content}>
				<section className={styles.section}>
					<span>Hello Developers!</span>
					<h1>
						Sejam todos bem-vindos ao <span>Open Source for Juniors</span>
					</h1>
					<p>
						O Open Source for Juniors foi fundado com o objetivo de ajudar pessoas que estão em
						início de carreira.
						<br />
					</p>
				</section>
				<picture>
					<img src="/home.png" alt="Home image" />
				</picture>
			</main>
		</>
	)
}
