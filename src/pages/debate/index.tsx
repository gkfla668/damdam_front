import type { GetServerSideProps, NextPage } from 'next'

export const getServerSideProps: GetServerSideProps<any> = async (context) => {
	return {
		redirect: { destination: `/debate/전체`, permanent: false },
	}
}

const Index: NextPage = () => {
	return <></>
}

export default Index
