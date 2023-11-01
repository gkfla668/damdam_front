import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useContext } from 'react'
import { LayoutContext } from 'context/Layout'
import styled from 'styled-components'
//-Components
import Layout from 'layout'
import LargeButton from 'components/Button/Large'
import TopicItem from 'components/Topic/Item'
//-Icon
import LogoSVG from 'public/app/logo.svg'
import DambiSVG from 'public/icons/dambi/half_dambi.svg'
import DambiMSVG from 'public/icons/dambi/half_dambi_mobile.svg'
import HotSVG from 'public/icons/hot.svg'

const IndexPage: NextPage = () => {
	const router = useRouter()

	const { device } = useContext(LayoutContext)
	const isMobile = device === 'mobile'

	return (
		<>
			<Layout>
				<Box>
					<LogoSVG />
					<div className='mt-5 mb-2 font-extrabold text-center text-main-900 md:text-[18px]'>
						담담은 AI 담비와 함께 학습하고 즐기는 <br />
						<span className='text-blue font-extrabold md:text-[18px]'>건강하고 자유로운 토의·토론 </span>
						플랫폼입니다!
					</div>
					{!isMobile ? <DambiSVG /> : <DambiMSVG />}
				</Box>

				<div className='flex flex-col items-center justify-center'>
					<div className='w-[90vw] md:w-[30vw]'>
						<div className='flex items-center justify-center gap-4 mb-4 mt-7 md:mt-10 md:mb-8'>
							<HotSVG />
							<div className='font-extrabold'>
								<span className='md:text-[20px]'>오늘의 </span>
								<span className='text-orange md:text-[20px]'>HOT 토픽</span>
							</div>
						</div>
						<ul className='flex flex-col items-center justify-center w-full gap-4'>
							<TopicItem title={"'의대 정원 확대', 의료 공백 문제 해결 가능한가? 💉"} onClick={() => router.push('/topic/room/2')} />
							<TopicItem title={"'한국형 제시카법', 대책 마련 절실 vs 위헌 소지 ⚠️"} onClick={() => router.push('/topic/room/9')} />
							<TopicItem title={"'망분리 규제', 완화해야 하는가? 🔐"} onClick={() => router.push('/topic/room/1')} />
							<TopicItem title={"'현금 없는 버스', 편리한 사회 vs 현금 사용 선택권 침해 🚌"} onClick={() => router.push('/topic/room/4')} />
							<TopicItem title={"'중대재해법' 근로자 사고 줄일 수 있는가? 🚧"} onClick={() => router.push('/topic/room/10')} />
						</ul>

						<div className='my-9'>
							<Link href='/topic'>
								<LargeButton text={'토픽 더보기'} />
							</Link>
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}

export default IndexPage

const Box = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	padding-top: 36px;
	border-bottom: 1px solid #e5e8ec;
`
