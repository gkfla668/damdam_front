import Router from 'next/router'
import Layout from 'layout'
import * as S from './style'
import LargeButton from 'components/Button/Large'

const Login = () => {
	const router = Router

	return (
		<Layout>
			<div className='container flex flex-col items-center justify-center mx-auto mt-[100px] p-0 text-center w-[464px] h-full'>
				<div className='text-[32px] font-extrabold'>로그인</div>
				<form action='' className='w-full'>
					<div className='mt-[56px] flex flex-col gap-4'>
						<input
							required
							type='email'
							placeholder='이메일 주소 입력'
							className='rounded-[28px] bg-[#f4f6f8] border-none py-4 px-6 placeholder:text-[#adb2bb]'
						/>
						<input
							required
							type='password'
							placeholder='비밀번호 입력'
							className='rounded-[28px] bg-[#f4f6f8] border-none py-4 px-6 placeholder:text-[#adb2bb]'
						/>
					</div>
					<div className='mt-6'>
						<LargeButton text={'로그인하기'} />
					</div>
				</form>

				<div className='flex gap-2 mt-3'>
					<span className='text-[14px] text-[#666666]'>아직 회원이 아니신가요?</span>
					<button onClick={() => router.push('/signup')} className='text-[#324478] text-[14px] font-extrabold'>
						회원가입
					</button>
				</div>

				<div className='flex w-full gap-4 mt-10'>
					<S.FindButton onClick={() => router.push('/findID')}>아이디 찾기</S.FindButton>
					<S.FindButton onClick={() => router.push('/findPW')}>비밀번호 찾기</S.FindButton>
				</div>
			</div>
		</Layout>
	)
}

export default Login
