import type { GetServerSideProps, NextPage } from 'next'

// NextJS는 기본적을 페이지를 SSR을 이용해 pre-rendering을 하기 때문에 이를 활용하기 위해 getServerSideProps를 사용한다.
export const getServerSideProps: GetServerSideProps<any> = async (context) => {
	return {
		redirect: { destination: `/study/0`, permanent: false },
	}
}

const Index: NextPage = () => {
	return <></>
}

export default Index
