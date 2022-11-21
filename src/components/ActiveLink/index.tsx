import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { cloneElement, ReactElement } from 'react'

interface ActiveLinkProps extends LinkProps {
	children: ReactElement
	activeHref: string
}

export const ActiveLink = ({ children, activeHref, ...rest }: ActiveLinkProps) => {
	const { asPath } = useRouter()

	const className = asPath === rest.href ? activeHref : ''

	return (
		<Link {...rest}>
			{cloneElement(children, {
				className
			})}
		</Link>
	)
}
