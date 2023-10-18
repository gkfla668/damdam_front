import type { NextPage } from 'next'
import Link from 'next/link'
import styled from 'styled-components'
//-Components
import Layout from 'layout'
import LargeButton from 'components/Button/Large'
import TopicItem from 'components/Topic/Item'
//-Icon
import LogoSVG from 'public/app/logo.svg'
import DambiSVG from 'public/icons/home_dambi.svg'
import HotSVG from 'public/icons/hot.svg'

const IndexPage: NextPage = () => {
	return (
		<>
			<Layout>
				<Box>
					<LogoSVG />
					<div className='mt-5 mb-2 font-extrabold text-center text-[#383b40] text-[20px] leading-8'>
						담담은 AI 담비와 함께 학습하고 즐기는 <br />
						<span className='text-[#324478] font-extrabold text-[20px] leading-8'>건강하고 자유로운 토의·토론 </span>
						플랫폼입니다!
					</div>
					<DambiSVG />
				</Box>

				<div className='flex flex-col items-center justify-center'>
					<div className='flex items-center justify-center gap-4 mt-10 mb-8'>
						<HotSVG />
						<div className='font-extrabold'>
							<span className='text-[20px]'>오늘의 </span>
							<span className='text-[#ed7743] text-[20px]'>HOT 토픽</span>
						</div>
					</div>

					<ul className='flex flex-col items-center justify-center gap-4'>
						<TopicItem title={'오늘의 인기 토픽 관련 질문 추천 🙋‍♀️'} />
						<TopicItem title={'기후 변화와 지속 가능성 ☀️'} />
						<TopicItem title={'온라인 학습 및 원격 교육 💻'} />
						<TopicItem title={'사이버 보안 및 데이터 개인 정보 보호 🔒'} />
						<TopicItem title={'생물 다양성 및 보전 🥀'} />
					</ul>

					<Link href='/topic' className='my-10'>
						<LargeButton text={'토픽 더보기'} />
					</Link>
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
	border: 1px solid #e5e8ec;
`
