import Layout from 'layout'
import router from 'next/router'
import NoResultSVG from 'public/icons/dambi/round_gray_dambi.svg'

const LandingPage = () => {
	return (
		<Layout>
			<div className='flex flex-col items-center justify-center w-full h-full gap-6 mt-8 mb-20'>
				<NoResultSVG width={120} height={120} />
				<span className='text-base text-center text-main-900'>해당 서비스는 개발 중에 있습니다.</span>{' '}
				<button className='rounded-md btn btn-point btn-md' onClick={() => router.back()}>
					마지막 페이지로 돌아가기
				</button>
			</div>
		</Layout>
	)
}

export default LandingPage
