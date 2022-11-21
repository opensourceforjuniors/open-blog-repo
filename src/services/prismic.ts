import Prismic from '@prismicio/client'

export const getPrismicClient = (req?: unknown) => {
	const prismic = Prismic.client('https://open-blog-repo.prismic.io/api/v2', {
		req,
		accessToken:
			'MC5ZM3RNWnhBQUFDWUE0S1hj.Xe-_ve-_vUDvv73vv73vv71P77-9NO-_vUl4Hu-_vWXvv70V77-9Ee-_ve-_vXbvv73vv71f77-977-977-9Xe-_vSM'
	})

	return prismic
}
