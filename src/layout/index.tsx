import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from 'utils/hooks/useAuth'

import NoSSR from 'components/common/NoSSR'
import Header from 'layout/Header'

interface Props {
	option?: LayoutOption
	children: ReactNode
}

export default function Layout({ option, children }: Props) {
	const router = useRouter()
	const { user, loading } = useAuth()

	useEffect(() => {
		if (loading !== true && option?.auth === true && !user?.id) router.push('/auth/login')
	}, [option?.auth, loading])

	return (
		<div className={`flex flex-col w-full min-h-screen overflow-y-scroll overflow-x-hidden scroll-hidden`}>
			<Header />

			<div className={`flex flex-col flex-grow relative w-full scroll-hidden`} style={option?.style || {}}>
				{option?.ssr ? children : <NoSSR>{children}</NoSSR>}
			</div>
		</div>
	)
}