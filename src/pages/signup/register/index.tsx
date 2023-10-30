import { useState } from 'react'
import { styled } from 'styled-components'
import LargeButton from 'components/Button/Large'
import Layout from 'layout'
import * as S from './style'

const Register = () => {
	const [id, setId] = useState('')
	const [pwd, setPwd] = useState('')
	const [confirmPwd, setConfirmPwd] = useState('')
	const [name, setName] = useState('')
	const [dateOfBirth, setDateOfBirth] = useState('')

	const [idCheckMsg, setIdCheckMsg] = useState('') /** 아이디 유효성 검사를 위한 메세지 */
	const [pwdCheckMsg, setPwdCheckMsg] = useState('') /** 비밀번호 유효성 검사를 위한 메세지 */
	const [pwdConfirmMsg, setPwdConfirmMsg] = useState('') /** 비밀번호 확인을 위한 메세지 */
	const [nameCheckMsg, setNameCheckMsg] = useState('')
	const [dateOfBirthCheckMsg, setDateOfBirthCheckMsg] = useState('') /** 생년월일 유효성 검사를 위한 메세지 */

	const idRegex = /^(?=.*[a-z])(?=.*[0-9]).{5,20}$/
	const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
		const userInput = e.target.value
		setId(userInput)

		/** 아이디 유효성 검사 */
		if (id.length >= 1 && !idRegex.test(userInput)) return setIdCheckMsg('* 5~20자의 영문 소문자, 숫자를 조합하여 입력해 주세요.')
		return setIdCheckMsg('')
	}

	const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/
	const onChangePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
		const userInput = e.target.value
		setPwd(userInput)

		/** 비밀번호 유효성 검사 */
		if (pwd.length >= 1 && !passwordRegex.test(userInput))
			return setPwdCheckMsg('* 8~16자의 영문 대/소문자, 숫자, 특수문자를 조합하여 입력해 주세요.')
		return setPwdCheckMsg('')
	}

	/** 비밀번호 확인 */
	const onChangePwdConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
		const curPwd = e.target.value
		setConfirmPwd(curPwd)

		if (pwd.length < 8) return setPwdConfirmMsg('* 비밀번호를 먼저 입력해 주세요.')
		if (curPwd.length >= 1 && pwd !== curPwd) return setPwdConfirmMsg('* 비밀번호가 다릅니다.')
		return setPwdConfirmMsg('')
	}

	const nameRegex = /^[가-힣]{2,5}$/
	const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		const userInput = e.target.value
		setName(userInput)

		/** 이름 유효성 검사*/
		if (!nameRegex.test(userInput)) return setNameCheckMsg('* 숫자 8자리를 입력해주세요.')
		return setDateOfBirthCheckMsg('')
	}

	const dateOfBirthRegex = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/
	const onChangeDateOfBirth = (e: React.ChangeEvent<HTMLInputElement>) => {
		const userInput = e.target.value
		setDateOfBirth(userInput)

		/** 생년월일 유효성 검사 */
		if (!dateOfBirthRegex.test(userInput)) return setDateOfBirthCheckMsg('* 숫자 8자리를 입력해주세요.')
		return setDateOfBirthCheckMsg('')
	}

	return (
		<Layout>
			<div className='flex flex-col items-center justify-center w-full'>
				<div className='text-[28px] font-extrabold mb-10 mt-[100px]'>회원가입</div>
				<form action='#' id='signupForm'>
					<div>
						<S.InputWrapper>
							<S.InputLabel>아이디</S.InputLabel>
							<S.Input
								required
								placeholder='아이디'
								value={id}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeId(e)}
								minLength={5}
								maxLength={20}
							/>
							<S.MessageText>{idCheckMsg}</S.MessageText>
						</S.InputWrapper>
						<S.InputWrapper>
							<S.InputLabel>비밀번호</S.InputLabel>
							<S.Input
								required
								type='password'
								placeholder='비밀번호'
								value={pwd}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangePwd(e)}
								minLength={8}
								maxLength={16}
							/>
							<S.MessageText>{pwdCheckMsg}</S.MessageText>
						</S.InputWrapper>
						<S.InputWrapper>
							<S.InputLabel>비밀번호 확인</S.InputLabel>
							<S.Input
								type='password'
								placeholder='비밀번호 확인'
								required
								value={confirmPwd}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangePwdConfirm(e)}
								minLength={8}
								maxLength={16}
							/>
							<S.MessageText>{pwdConfirmMsg}</S.MessageText>
						</S.InputWrapper>
						<S.InputWrapper>
							<S.InputLabel>이름</S.InputLabel>
							<S.Input
								required
								placeholder='이름'
								value={name}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeName(e)}
								minLength={2}
								maxLength={5}
							/>
						</S.InputWrapper>
						<S.InputWrapper>
							<S.InputLabel>생년월일 8자리</S.InputLabel>
							<S.Input
								required
								placeholder='생년월일 8자리'
								value={dateOfBirth}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeDateOfBirth(e)}
								minLength={8}
								maxLength={8}
							/>
							<S.MessageText>{dateOfBirthCheckMsg}</S.MessageText>
						</S.InputWrapper>
						<div className='pb-[36px] border-b-[1px] border-b-[#D8D8D8] flex flex-col gap-2'>
							<S.InputLabel htmlFor='gender'>성별</S.InputLabel>
							<div className='flex gap-3'>
								<FormRadioInput type='radio' id='radio-1' name='gender' value='male' checked />
								<FormRadioLabel htmlFor='radio-1'>여자</FormRadioLabel>

								<FormRadioInput type='radio' id='radio-2' name='gender' value='female' />
								<FormRadioLabel htmlFor='radio-2'>남자</FormRadioLabel>
							</div>
						</div>
					</div>
					<div className='mt-[36px]'>
						<p className='font-extrabold'>건강한 토의토론 문자를 위해 본인인증 서비스를 실시하고 있습니다.</p>
					</div>
					<div className='mt-[100px] mb-[16px] text-[#666666]'>
						<LargeButton text={'완료'} width={'840'} />
					</div>
				</form>
			</div>
		</Layout>
	)
}

export default Register

const FormRadioLabel = styled.label`
	width: 100px;
	height: 56px;

	border: 1px solid #adb2bb;
	border-radius: 50px;

	display: flex;
	justify-content: center;
	align-items: center;

	cursor: pointer;
`

const FormRadioInput = styled.input.attrs({ type: 'radio' })`
	display: none;

	&:checked {
		display: inline-block;
		background: none;
		padding: 0px 10px;
		text-align: center;
		height: 35px;
		line-height: 33px;
		font-weight: 500;
		display: none;
	}
	&:checked + ${FormRadioLabel} {
		border: 2px solid #184da0;
		font-weight: 900;
		color: #184da0;
	}
`
