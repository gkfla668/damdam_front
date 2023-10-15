import type { NextPage } from 'next'
//-Components
import Layout from 'layout'

const IndexPage: NextPage = () => {
	return (
		<Layout>
			<div className='container mx-auto mt-12 md:mt-24 text-center'>
				<span>메인페이지</span>
			</div>
		</Layout>
	)
}

export default IndexPage
