import { ActiveLink } from '../ActiveLink'
import styles from './styles.module.scss'

export const Header = () => {
	return (
		<header className={styles.container}>
			<div className={styles.content}>
				<picture>
					<img src="logo.png" alt="DevNews!" />
				</picture>
				<p>Open Source for Juniors</p>
				<nav>
					<ActiveLink href="/" activeHref={styles.active}>
						<a>Home</a>
					</ActiveLink>

					<ActiveLink href="/posts" activeHref={styles.active}>
						<a>Posts</a>
					</ActiveLink>
				</nav>
			</div>
		</header>
	)
}
