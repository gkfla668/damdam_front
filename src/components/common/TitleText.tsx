import styled from 'styled-components'

const TitleText = ({ title, className }: { title: string; className?: string }) => {
	return <Title className={className}>{title}</Title>
}

const Title = styled.div`
	font-size: 2.8rem;
	font-weight: 900;

	@media screen and (max-width: 768px) {
		font-size: 2.4rem;
	}
`

export default TitleText
