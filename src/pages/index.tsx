import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { useContext, useState } from 'react'
import { LayoutContext } from 'context/Layout'
import styled from 'styled-components'
//-Components
import Layout from 'layout'
import LargeButton from 'components/Button/Large'
import TopicItem from 'components/Topic/Item'
//-Icon
import LogoSVG from 'public/app/logo.svg'
import DambiSVG from 'public/icons/dambi/half_dambi.svg'
import DambiMSVG from 'public/icons/dambi/half_dambi_m.svg'
import HotSVG from 'public/icons/icon_hot.svg'
import HotMSVG from 'public/icons/icon_hot_m.svg'
import LoginModal from 'components/common/LoginModal'
import { useAuth } from 'utils/hooks/useAuth'

const IndexPage: NextPage = () => {
	const router = useRouter()

	const { device } = useContext(LayoutContext)
	const isMobile = device === 'mobile'

	const { user } = useAuth()
	const loggedIn = user?.id

	const [modal, setModal] = useState<boolean>(false)

	const onConfirmLogin = (id: string) => {
		if (!loggedIn) return setModal(true)

		router.push(`/topic/room/${id}`)
	}

	return (
		<Layout>
			<Box>
				<LogoSVG />
				<div className='mt-5 mb-2 font-extrabold text-center text-main-900 md:text-lg md:leading-9'>
					담담은 AI 담비와 함께 학습하고 즐기는 <br />
					<span className='font-extrabold text-blue md:text-xl'>건강하고 자유로운 토의·토론 </span>
					플랫폼입니다!
				</div>
				{!isMobile ? <DambiSVG /> : <DambiMSVG />}
			</Box>

			<div className='flex flex-col items-center justify-center'>
				<div className='w-[90vw] md:w-[30vw]'>
					<div className='flex items-center justify-center gap-4 mt-9 mb-7 md:mt-10 md:mb-8'>
						{!isMobile ? <HotSVG /> : <HotMSVG />}
						<div className='font-extrabold'>
							<span className='text-lg md:text-xl'>오늘의 </span>
							<span className='text-lg text-orange md:text-xl'>HOT 토픽</span>
						</div>
					</div>
					<ul className='flex flex-col items-center justify-center w-full gap-4'>
						<TopicItem title={"'의대 정원 확대', 의료 공백 문제 해결 가능한가? 💉"} onClick={() => onConfirmLogin('2')} isHome={true} />
						<TopicItem title={"'한국형 제시카법', 대책 마련 절실 vs 위헌 소지 ⚠️"} onClick={() => onConfirmLogin('9')} isHome={true} />
						<TopicItem title={"'망분리 규제', 완화해야 하는가? 🔐"} onClick={() => onConfirmLogin('1')} isHome={true} />
						<TopicItem
							title={"'현금 없는 버스', 편리한 사회 vs 현금 사용 선택권 침해 🚌"}
							onClick={() => onConfirmLogin('4')}
							isHome={true}
						/>
						<TopicItem title={"'중대재해법' 근로자 사고 줄일 수 있는가? 🚧"} onClick={() => onConfirmLogin('10')} isHome={true} />
					</ul>

					<div className='my-[2.4rem] md:my-[3.2rem]'>
						<Link href='/topic'>
							<LargeButton text={'토픽 더보기'} />
						</Link>
					</div>
				</div>
			</div>

			<LoginModal open={modal} onClose={() => setModal(false)} />
		</Layout>
	)
}

export default IndexPage

const Box = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	padding-top: 3.6rem;
	border-bottom: 0.1rem solid #e5e8ec;
`
