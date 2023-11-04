import Router from 'next/router'
import { useState } from 'react'
import Layout from 'layout'
import * as S from './style'

import TitleText from 'components/common/TitleText'
import LargeButton from 'components/Button/Large'

import styled from 'styled-components'

const Login = () => {
	const router = Router

	const [id, setId] = useState('')
	const [pwd, setPwd] = useState('')

	const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
		setId(e.target.value)
	}

	const onChangePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPwd(e.target.value)
	}

	return (
		<Layout>
			<div className='container flex flex-col items-center mx-auto mt-[88px] p-0 text-center w-[320px] md:w-[464px] h-full'>
				<TitleText title='로그인' />
				<form action={'#'} className='w-full'>
					<div className='mt-[48px] flex flex-col gap-4'>
						<Input
							required
							placeholder='아이디 입력'
							value={id}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeId(e)}
							maxLength={20}
						/>

						<Input
							required
							type='password'
							placeholder='비밀번호 입력'
							value={pwd}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangePwd(e)}
							minLength={8}
							maxLength={16}
						/>
					</div>
					<div className='w-full mt-6'>
						<LargeButton text={'로그인하기'} />
					</div>
				</form>

				<div className='flex gap-2 mt-3'>
					<span className='text-[1.3rem] md:text-base text-[#666666]'>아직 회원이 아니신가요?</span>
					<button onClick={() => router.push('/signup')} className='text-blue text-[1.3rem] md:text-base font-extrabold'>
						회원가입
					</button>
				</div>

				<div className='flex w-full gap-4 mt-10'>
					<S.FindButton onClick={() => router.push('/preparation')}>아이디 찾기</S.FindButton>
					<S.FindButton onClick={() => router.push('/preparation')}>비밀번호 찾기</S.FindButton>
				</div>
			</div>
		</Layout>
	)
}

export default Login

const Input = styled.input`
	border: none;
	border-radius: 2.8rem;
	background-color: #f4f6f8;
	padding: 1.8rem 2.4rem;
	font-size: 1.2rem;

	&::placeholder {
		color: #adb2bb;
	}

	@media screen and (max-width: 768px) {
		font-size: 1rem;
		padding: 1.2rem 2rem;
	}
`
