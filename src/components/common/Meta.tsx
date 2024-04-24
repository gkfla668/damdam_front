import Head from 'next/head'

export default function Meta({ title, url, description, image }: { title?: string; url?: string; description?: string; image?: string }) {
	return (
		<Head>
			<title>{title}</title>
			<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
			<meta name='keywords' content='~' />
			<meta name='description' content={description || ''} />
			<meta name='robots' content='noindex, nofollow' />

			<meta property='og:url' content={url || 'https://test.com'} />
			<meta property='og:image' content={image || ''} />
			<meta property='og:description' content={description || '~'} />
			<meta property='og:title' content={title || 'Amy'} />

			<link rel='icon' href={'/app/logo.svg'} type='image/x-icon' />
		</Head>
	)
}
