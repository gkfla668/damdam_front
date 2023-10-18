import { LayoutContext } from 'context/Layout'
import { useContext, useState } from 'react'

import Link from 'next/link'
import Modal from 'react-modal'
//-assets
import LogoSVG from 'public/app/logo.svg'
import CharSVG from 'public/icons/btn_profile_pc.svg'
import MenuSVG from 'public/icons/btn_menu_m.svg'
import CloseSVG from 'public/icons/btn_exit_black.svg'
import NavPointSVG from 'public/icons/gnb_point.svg'

export default function Header() {
	const { device } = useContext(LayoutContext)
	const [modal, setModal] = useState<boolean>(false)

	const isMobile = device === 'mobile'

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
						<Link href='/study'>
							<span className='text-xl font-extrabold text-main-900 whitespace-nowrap'>학습</span>
						</Link>
						<Link href='/topic'>
							<span className='text-xl font-extrabold text-main-900 whitespace-nowrap'>토픽</span>
						</Link>
						<Link href='/debate' className='relative'>
							<span className='text-xl font-extrabold text-point-900 whitespace-nowrap'>토론</span>
							<div className='w-full border-b-[3px] border-point-900 rounded-full' />
							<NavPointSVG width={10} height={9} className='absolute top-0 -right-2' />
						</Link>
					</div>
				)}

				<div className='flex flex-row justify-end w-40'>
					{isMobile && <MenuSVG width={24} height={24} onClick={() => setModal(true)} />}
					{!isMobile && <CharSVG width={36} height={36} />}
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
						<Link href='/study'>
							<span className='block w-full py-4 text-base font-extrabold text-main-900'>학습</span>
						</Link>
						<Link href='/topic'>
							<span className='block w-full py-4 text-base font-extrabold text-main-900'>토픽</span>
						</Link>
						<Link href='/debate'>
							<span className='block w-full py-4 text-base font-extrabold text-main-900'>토론</span>
						</Link>
					</div>
				</div>
			</Modal>
		</div>
	)
}
