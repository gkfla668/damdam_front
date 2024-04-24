import type { AppProps } from 'next/app'
import { useEffect } from 'react'

import { AuthProvider } from 'context/AuthContext'
import { LayoutProvider } from 'context/Layout'
import { SocketProvider } from 'context/Socket'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { store } from '../redux/store'

import Meta from 'components/common/Meta'
//-moment 처리
import moment from 'moment'
import 'moment-timezone'
import 'moment/locale/ko'
//-css import
import 'react-toastify/dist/ReactToastify.css'
import 'react-confirm-alert/src/react-confirm-alert.css'
import 'styles/globals.scss'

export default function App({ Component, pageProps }: AppProps) {
	useEffect(() => {
		//-moment locale, timezone 설정
		moment.locale('ko')
		moment.tz.setDefault('Asia/Seoul')

		//-모바일의 경우 height: screen 처리 시 statusBar 때문에 영역 밀리는걸 고려하는 코드
		const appHeight = () => {
			const doc = document.documentElement
			doc.style.setProperty('--app-height', `${window.innerHeight}px`)
		}

		// 윈도우 이베튼로 등록하여 처리
		window.addEventListener('resize', appHeight)
		appHeight()
	}, [])

	return (
		<Provider store={store}>
			<LayoutProvider>
				<SocketProvider>
					<AuthProvider>
						<Meta title='담담 - 토론플랫폼' />
						<Component {...pageProps} />
						<ToastContainer
							theme='light'
							position='top-right'
							autoClose={2500}
							newestOnTop={true}
							closeButton={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
						/>
					</AuthProvider>
				</SocketProvider>
			</LayoutProvider>
		</Provider>
	)
}
