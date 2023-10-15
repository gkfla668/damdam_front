import { createContext, useState, useEffect } from 'react'

export type _T_Device = 'mobile' | 'tablet' | 'desktop' | null
const defaultState = {
	device: 'desktop',
}

export const LayoutContext = createContext<any>(defaultState)
export const LayoutProvider = ({ children }: { children: JSX.Element }) => {
	const [width, setWidth] = useState<number>(0)
	const [device, setDevice] = useState<_T_Device>(null)
	// width에 따라 desktop, tablet, mobile 구분
	const onChangeWidth = (wd: number) => {
		setWidth(wd)
		wd > 1024 + 24 ? setDevice('desktop') : wd > 486 ? setDevice('tablet') : setDevice('mobile')
	}

	const handleResize = () => onChangeWidth(window.innerWidth)

	useEffect(() => handleResize(), [])
	useEffect(() => {
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [width])

	return <LayoutContext.Provider value={{ device, width }}>{children}</LayoutContext.Provider>
}
