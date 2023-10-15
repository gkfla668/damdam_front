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
			<div className='w-full lg:container mx-auto'>
				<div className='logo-box w-40'>
					<Link href='/'>
						<LogoSVG height={isMobile ? 28 : 40} />
					</Link>
				</div>
				{!isMobile && (
					<div className='flex flex-row items-start gap-24'>
						<Link href='/study'>
							<span className='text-xl text-main-900 font-extrabold'>학습</span>
						</Link>
						<Link href='/topic'>
							<span className='text-xl text-main-900 font-extrabold'>토픽</span>
						</Link>
						<Link href='/debate' className='relative'>
							<span className='text-xl text-point-900 font-extrabold'>토론</span>
							<div className='w-full border-b-[3px] border-point-900 rounded-full' />
							<NavPointSVG width={10} height={9} className='absolute top-0 -right-2' />
						</Link>
					</div>
				)}

				<div className='w-40 flex flex-row justify-end'>
					{isMobile && <MenuSVG width={24} height={24} onClick={() => setModal(true)} />}
					{!isMobile && <CharSVG width={48} height={48} />}
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

					<div className='grow flex flex-col'>
						<Link href='/study'>
							<span className='block w-full py-4 text-base text-main-900 font-extrabold'>학습</span>
						</Link>
						<Link href='/topic'>
							<span className='block w-full py-4 text-base text-main-900 font-extrabold'>토픽</span>
						</Link>
						<Link href='/debate'>
							<span className='block w-full py-4 text-base text-main-900 font-extrabold'>토론</span>
						</Link>
					</div>
				</div>
			</Modal>
		</div>
	)
}
