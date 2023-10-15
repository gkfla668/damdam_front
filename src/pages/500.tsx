import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from 'layout'

const Error: NextPage = () => {
	const router = useRouter()

	return (
		<Layout>
			<div className='px-4'>
				<span className='text-base text-neutral-900 font-normal block mb-3'>서버 에러가 발생하였습니다</span>
				<button className='btn btn-point btn-md rounded-md' onClick={() => router.back()}>
					마지막 페이지로 돌아가기
				</button>
			</div>
		</Layout>
	)
}

export default Error
