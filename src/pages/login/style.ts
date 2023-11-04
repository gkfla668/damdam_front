import styled from 'styled-components'

/** 아이디 찾기, 비밀번호 찾기 버튼 */
export const FindButton = styled.button`
	width: 100%;

	padding: 1.2rem 0rem;
	border: 1px solid #adb2bb;
	border-radius: 3.2rem;

	font-weight: 400;
	text-align: center;
	letter-spacing: -1px;

	color: #383b40;

	&:hover {
		background-color: #e7edfd;
		font-weight: 900;
		color: #324478;
	}

	@media screen and (max-width: 768px) {
		font-size: 1.2rem;
		padding: 1rem 0rem;
	}
`
