import { LayoutContext } from 'context/Layout'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Modal from 'react-modal'
//-assets
import LogoSVG from 'public/app/full_logo.svg'
import CharSVG from 'public/icons/btn_profile_pc.svg'
import MenuSVG from 'public/icons/btn_menu_m.svg'
import CloseSVG from 'public/icons/btn_exit_black.svg'
import NavPointSVG from 'public/icons/gnb_point.svg'

import styled from 'styled-components'
import { useAuth } from 'utils/hooks/useAuth'

export default function Header() {
	const { device } = useContext(LayoutContext)
	const [modal, setModal] = useState<boolean>(false)

	const isMobile = device === 'mobile'

	const router = useRouter()
	const curPath = router.pathname

	const { user } = useAuth()
	const loggedIn = user?.id

	return (
		<div id='header' className={isMobile ? 'small' : ''}>
			<div className='w-full mx-auto lg:container'>
				<div className='w-40 logo-box'>
					<Link href='/'>
						<LogoSVG height={isMobile ? 16 : 28} />
					</Link>
				</div>
				{!isMobile && (
					<div className='flex flex-row items-start gap-24'>
						<Link href='/study' className='relative'>
							<MenuItem>학습</MenuItem>
							{curPath.includes('/study') && (
								<>
									<div className='w-full border-b-[3px] border-blue rounded-full' />
									<NavPointSVG width={10} height={9} className='absolute top-0 -right-3' />
								</>
							)}
						</Link>
						<Link href='/topic' className='relative'>
							<MenuItem>토픽</MenuItem>
							{curPath.includes('/topic') && (
								<>
									<div className='w-full border-b-[3px] border-blue rounded-full' />
									<NavPointSVG width={10} height={9} className='absolute top-0 -right-3' />
								</>
							)}
						</Link>
						<Link href='/debate' className='relative'>
							<MenuItem>토론</MenuItem>
							{curPath.includes('/debate') && (
								<>
									<div className='w-full border-b-[3px] border-blue rounded-full' />
									<NavPointSVG width={10} height={9} className='absolute top-0 -right-3' />
								</>
							)}
						</Link>
					</div>
				)}

				<div className='flex flex-row justify-end w-40'>
					{isMobile && <MenuSVG width={24} height={24} onClick={() => setModal(true)} />}
					<Link href={'/login'}> {!isMobile && <CharSVG width={36} height={36} />}</Link>
				</div>
			</div>

			<Modal
				isOpen={modal}
				onRequestClose={() => setModal(false)}
				ariaHideApp={false}
				style={{
					content: {
						width: '100%',
						inset: undefined,
						padding: 16,
					},
				}}
			>
				<div className='flex flex-col gap-5'>
					<div className='flex flex-row justify-between items-center mb-[10px]'>
						<Link href='/' as='/'>
							<LogoSVG height={isMobile ? 28 : 40} />
						</Link>

						<CloseSVG width={24} height={24} className='cursor-pointer' onClick={() => setModal(false)} />
					</div>

					<div className='flex flex-col grow'>
						<Link href='/'>
							<span className='block w-full py-4 text-base font-extrabold text-main-900'>홈</span>
						</Link>
						<Link href='/study'>
							<span className='block w-full py-4 text-base font-extrabold text-main-900'>학습</span>
						</Link>
						<Link href='/topic'>
							<span className='block w-full py-4 text-base font-extrabold text-main-900'>토픽</span>
						</Link>
						<Link href='/debate'>
							<span className='block w-full py-4 text-base font-extrabold text-main-900'>토론</span>
						</Link>
						{!loggedIn ? (
							<Link href='/login'>
								<span className='block w-full py-4 text-base font-extrabold text-main-900'>로그인</span>
							</Link>
						) : (
							<Link href='/debate'>
								<span className='block w-full py-4 text-base font-extrabold text-main-900'>마이</span>
							</Link>
						)}
					</div>
				</div>
			</Modal>
		</div>
	)
}

const MenuItem = styled.span`
	font-size: 20px;
	font-weight: 900;
	color: #383b40;
	white-space: nowrap;
`
