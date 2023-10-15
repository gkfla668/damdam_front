import { ReactNode } from 'react'
import dynamic from 'next/dynamic'

const NoSSR = ({ children }: { children?: JSX.Element | ReactNode }) => <>{children}</>
export default dynamic(() => Promise.resolve(NoSSR), {
	ssr: false,
})
