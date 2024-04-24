import { LayoutContext } from 'context/Layout'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Modal from 'react-modal'
//-assets
import LogoSVG from 'public/app/full_logo.svg'
import CharSVG from 'public/icons/btn_profile_pc.svg'
import ProfileColorSVG from 'public/icons/btn_profile_color_pc.svg'
import MenuSVG from 'public/icons/btn_menu_m.svg'
import CloseSVG from 'public/icons/btn_exit_black.svg'
import NavPointSVG from 'public/icons/gnb_point.svg'

import styled from 'styled-components'
import { useAuth } from 'utils/hooks/useAuth'
import LoginModal from 'components/common/LoginModal'
import { toast } from 'react-toastify'

export default function Header() {
	const { device } = useContext(LayoutContext)
	const [modal, setModal] = useState<boolean>(false)

	const isMobile = device === 'mobile'

	const router = useRouter()
	const curPath = router.pathname

	const { user } = useAuth()
	const loggedIn = user?.id

	const [loginModal, setLoginModal] = useState<boolean>(false)

	const [iconModal, setIconModal] = useState(false)

	const onConfirmLogin = () => {
		return toast.error('준비 중입니다...')
	}

	const { handleLogout } = useAuth()

	const onLogout = () => {
		handleLogout()
	}

	return (
		<div id='header' className={isMobile ? 'small' : ''}>
			<div className='w-full mx-auto lg:container'>
				<div className='w-40 logo-box'>
					<Link href='/'>
						<LogoSVG height={isMobile ? 18 : 28} />
					</Link>
				</div>
				{!isMobile && (
					<div className='flex flex-row items-start gap-24'>
						<div className='relative cursor-pointer' onClick={onConfirmLogin}>
							<MenuItem className={`${curPath.includes('/study') ? 'text-blue' : 'text-[#383b40]'}`}>학습</MenuItem>
							{curPath.includes('/study') && (
								<>
									<div className='w-full border-b-[3px] border-blue rounded-full' />
									<NavPointSVG width={10} height={9} className='absolute top-0 -right-4' />
								</>
							)}
						</div>
						<div onClick={() => toast.error('준비 중입니다...')} className='relative cursor-pointer'>
							<MenuItem className={`${curPath.includes('/topic') ? 'text-blue' : 'text-[#383b40]'}`}>토픽</MenuItem>
							{curPath.includes('/topic') && (
								<>
									<div className='w-full border-b-[3px] border-blue rounded-full' />
									<NavPointSVG width={10} height={9} className='absolute top-0 -right-4' />
								</>
							)}
						</div>

						<Link href='/debate' className='relative'>
							<MenuItem className={`${curPath.includes('/debate') ? 'text-blue' : 'text-[#383b40]'}`}>토론</MenuItem>
							{curPath.includes('/debate') && (
								<>
									<div className='w-full border-b-[3px] border-blue rounded-full' />
									<NavPointSVG width={10} height={9} className='absolute top-0 -right-4' />
								</>
							)}
						</Link>
					</div>
				)}

				<div className='flex items-center justify-end w-40 cursor-pointer'>
					{isMobile ? (
						<MenuSVG width={24} height={24} onClick={() => setModal(true)} />
					) : (
						<div className='relative flex flex-col items-center justify-center ralative drop-shadow-lg active:drop-shadow-sm'>
							<div onClick={() => setIconModal(!iconModal)}>{loggedIn ? <ProfileColorSVG /> : <CharSVG width={36} height={36} />}</div>
							{iconModal && (
								<Bubble onClick={!loggedIn ? () => router.push('/login') : handleLogout}>{!loggedIn ? '로그인' : '로그아웃'}</Bubble>
							)}
						</div>
					)}
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
							<LogoSVG height={isMobile ? 24 : 40} />
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
						<div className='border-t-[1px] border-gray  pt-1'>
							{!loggedIn ? (
								<Link href='/login'>
									<span className='block w-full py-4 text-sm font-extrabold text-blue'>로그인</span>
								</Link>
							) : (
								<div onClick={onLogout}>
									<span className='block w-full py-4 text-sm font-extrabold text-main-900'>로그아웃</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</Modal>

			<LoginModal open={loginModal} onClose={() => setLoginModal(false)} />
		</div>
	)
}

const MenuItem = styled.span`
	font-size: 1.8rem;
	font-weight: 900;
	white-space: nowrap;
`

const Bubble = styled.button`
	position: absolute;
	right: 5rem;
	border: 1.6px solid #324478;
	color: #324478;
	margin-top: 0.4rem;
	border-radius: 0.8em;

	padding: 0.5rem 2.4rem;
	white-space: nowrap;
	font-size: 1.2rem;
	font-weight: 800;

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	animation: fadeIn 1s ease-in-out;
`
