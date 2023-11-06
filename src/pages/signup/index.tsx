import { useState } from 'react'
import styled from 'styled-components'
import Layout from 'layout'

import DropdownSVG from 'public/icons/btn_arrow_bottom.svg'
import DroptopSVG from 'public/icons/btn_arrow_top.svg'

import LargeButton from 'components/Button/Large'
import TitleText from 'components/common/TitleText'

const Signup = () => {
	const [checkItems, setCheckItems] = useState<Array<string>>([])
	const [, setIsAllChecked] = useState(false)

	const [firstClick, setFirstClick] = useState(false)
	const [secondClick, setSecondClick] = useState(false)

	const handleAllCheck = (checked: boolean) => {
		setIsAllChecked((isAllchecked) => !isAllchecked)

		if (checked) {
			checkItems.push('first')
			checkItems.push('second')
		} else {
			setCheckItems(() => []) // 초기화
		}
	}

	const handleSingleCheck = (checked: boolean, id: string) => {
		if (checked) return setCheckItems([...checkItems, id])
		setCheckItems(checkItems.filter((el) => el !== id))
	}

	const handleFirstClick = () => {
		setFirstClick(!firstClick)
	}

	const handleSecondClick = () => {
		setSecondClick(!secondClick)
	}

	return (
		<Layout>
			<div className='container flex flex-col items-center p-0  mt-[44px] md:mt-[88px] h-full'>
				<div className='w-[320px] md:w-[840px] flex flex-col items-center'>
					<TitleText className='mb-9 md:mb-10' title={'회원가입'} />
					<div className='flex justify-start w-full mb-5 md:mb-6'>
						<p className='w-[60vw] font-bold text-sm md:text-lg'>
							담담에 오신 것을 환영합니다. <br /> 온라인 토의/토론 서비스 이용을 위하여 아래의 약관 동의가 필요합니다.
						</p>
					</div>

					<form action='/signup/register' id='signupForm' className='flex flex-col items-start w-full'>
						{/** 전체동의 체크박스 */}
						<div className=' w-full flex items-center gap-2 py-4 border-y-[1px] border-y-[#e5e8ec]'>
							<Input id='all' type='checkbox' checked={checkItems.length >= 2} onChange={(e) => handleAllCheck(e.target.checked)} />
							<Label htmlFor='all'>전체동의</Label>
						</div>
						<div className='flex flex-col w-full gap-6 pt-6'>
							{/** 담담 서비스 이용약관 체크박스 */}
							<div>
								<div className='flex justify-between'>
									<div className='flex items-center gap-2'>
										<Input
											required
											id='first'
											type='checkbox'
											checked={checkItems.includes('first')}
											onChange={(e) => handleSingleCheck(e.target.checked, e.target.id)}
										/>
										<Label htmlFor='first'>
											<span className='font-extrabold text-orange'>(필수)</span>
											<Text>담담 서비스 이용약관</Text>
										</Label>
									</div>
									<div className='cursor-pointer'>
										{!firstClick ? (
											<DropdownSVG width='24' onClick={handleFirstClick} />
										) : (
											<DroptopSVG width='24' onClick={handleFirstClick} />
										)}
									</div>
								</div>
								{firstClick ? (
									<div className='w-full p-6 mt-6 bg-[#f4f6f8] rounded-[16px]'>
										<P>
											<Title>제1조 (목적) </Title> 본 약관은 담담 서비스의 이용과 관련하여 당사와 서비스 이용자(이하 '회원')간에 권리·의무
											및 기타 필요한 사항을 규정함을 목적으로 합니다.
										</P>
										<br />
										<P>
											<Title>제2조 (용어의 정의)</Title> 본 약관에서 사용하는 용어의 정의는 다음과 같고 정의된 용어의 정의 외에는 관계법령
											및 기타 일반적인 상례와 관례에 의합니다. <br />
											1. 회원: 서비스에 접속하여 서비스를 이용하는 모든 고객을 말합니다. <br />
											2. 아이디(ID): 회원의 식별과 서비스 이용을 위하여 회원이 정하고 당사가 승인하는 문자와 숫자의 조합을 말합니다. <br />
											3. 회원정보: 당사가 서비스 이용을 제공하기 위해 수집한 회원의 이름, 생년월일 등 회원의 개인정보를 말합니다. <br />
											4. 게시물: 당사가 제공하는 서비스(이하 '토픽', '토론' 서비스)에 회원이 게시한 부호, 문자, URL 링크 등을 의미합니다.
										</P>
										<br />
										<P>
											<Title>제3조 (약관의 효력과 개정)</Title>
											1. 본 약관은 서비스에 게시하거나 기타의 방법으로 회원에게 공지함으로써 효력이 발생합니다. <br />
											2. 당사는 약관의 규제에 관한 법률 등의 관계법령에 위배되지 않는 범위 내에서 이 약관을 개정할 수 있습니다. <br />
											3. 당사는 약관을 개정할 경우 개정이유와 적용일자를 명시하여 개정약관의 적용일자 7일 전부터 공지사항을 통해 공지합니다.
											<br />
											4. 당사가 개정 약관을 공지 또는 통지하면서 회원이 7일 내에 거부의사를 표시하지 않으면 승인한 것으로 본다는 뜻을 공지
											또는 통지하였음에도 불구하고 회원이 명시적으로 거부의사를 밝히지 않은 경우 회원이 개정약관에 동의한 것으로 간주합니다.
											<br />
											5. 회원은 개정 약관에 동의하지 않는 경우 서비스 이용을 중단하고 이용계약을 해지할 수 있습니다. <br />
											6. 이 약관은 서비스를 이용하고자 하는 모든 회원에 대하여 그 효력을 발생합니다.
										</P>
										<br />
										<P>
											<Title>제4조 (약관 외 준칙) </Title> 본 약관에 명시되지 않은 사항에 대해서는 관계법령 및 서비스를 이용하면서 고지되는
											세부이용지침 등의 규정에 따릅니다.
										</P>
										<br />
										<P>
											<Title>제5조 이용계약 체결</Title>
											1. 이용계약은 회원이 되고자 하는 고객(이하 '회원가입 신청자')이 약관의 내용에 동의한 후 당사가 정한 신청약식에 따라
											서비스 이용을 신청하고 당사가 이를 승낙함으로써 성립합니다.
											<br />
											2. 당사는 다음 각호에 해당하는 신청에 대하여는 승낙을 하지 않거나 사후에 이용계약을 해지할 수 있습니다. - 타인의
											명의를 이용하거나 도용하여 신청한 경우 - 허위 정보 기재 또는 당사가 제시한 내용을 기재하지 않은 경우 - 회원가입
											신청자가 약관 또는 당사가 정한 서비스 운영정책에 회원자격을 상실한 경우 - 기타 회원가입 신청자의 귀책사유로 인하여
											승인이 불가능하다고 판단되는 경우 <br />
											3. 당사는 서비스관련 설비가 부족하거나, 기술상 또는 업무상 문제가 있는 경우에는 승낙을 유보할 수 있습니다. <br />
											4. 당사는 서비스 이용에 필요한 회원 정보 및 기타 정보 항목을 추가하거나 변경할 수 있습니다. <br />
											5. 회원은 서비스내의 회원탈퇴 메뉴를 통해 직접 회원탈퇴를 할 수 있습니다.
										</P>
										<br />
										<P>
											<Title>제6조 회원정보의 변경</Title>
											1. 회원은 서비스내 마이 메뉴를 통해서 본인의 개인정보를 열람할 수 있으며 이름, 아이디를 제외한 개인정보는 수정할 수
											있습니다. <br />
											2. 회원은 개인정보가 변경되거나 잘못된 정보를 입력하였을 경우 지체없이 수정해야 하며, 수정하지 않음으로 인해 발생하는
											모든 불이익에 대해서는 당사가 책임지지 않습니다.
										</P>
										<br />
										<P>
											<Title>제7조 서비스의 이용</Title>
											1. 당사는 회원에게 아래와 같은 서비스를 제공합니다. - 담담: 다양한 주제에 관해 AI 담비와 학습하고, 회원과 의견을
											나누고 토론할 수 있는 서비스 <br />
											2. 회원은 이용계약 체결이 완료되면 바로 서비스 이용이 가능합니다. <br />
											3. 당사는 서비스의 제공에 필요한 경우 서비스 점검을 실시할 수 있으며, 점검시간을 미리 공지하거나 회원에게 통보합니다.
											<br />
											4. 당사는 업무상, 운영정책상, 또는 기술상의 장애로 인하여 서비스를 일시 중지할 수 있으며, 이 경우에는 서비스에
											공지하거나 회원에게 사전 또는 사후 통지를 해야 합니다. <br />
											5. 당사는 당사가 정한 서비스 정책에 따라 회원별 이용시간, 이용횟수, 서비스 메뉴 등을 세분화하여 이용에 차등을 둘 수
											있습니다. <br />
											6. 당사는 서비스 장애 발견시 적극 서비스 개선에 노력합니다.
										</P>
										<br />
										<P>
											<Title>제8조 서비스 이용중지 또는 계약해지 </Title>
											1. 당사는 다음 각호에 해당하는 회원에 대하여는 별도의 공지나 통보없이 회원의 서비스 이용을 중지하거나 계약을 해지할 수
											있습니다. - 회원 신청 또는 개인정보 변경시 타인의 정보를 도용하거나 허위 내용을 등록한 경우 - 당사가 서비스내 공지한
											게시물 운영정책을 준수하지 않은 경우 - 당사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위를 하는 경우 -
											타인 동의 없이 타인의 개인정보를 수집하는 행위를 할 경우 - 당사의 동의 없이 영리를 목적으로 서비스를 사용하는 행위를
											할 경우 - 당사와 기타 제3자의 저작권 등 지적 재산권을 침해하는 경우 - 기타 불법적이거나 부당한 행위를 하거나 관련
											법령에 위배되는 행위를 할 경우 - 전체 사용자 이익에 반하거나 서비스 목적에 위배되는 행위를 할 경우 <br />
											2. 이용 중지가 될 수 있는 구체적인 항목은 아래와 같습니다. - 비속어/폭언/비하/음란 등 불쾌감을 주는 글 게재 - 허위
											사실을 유포하는 글 게재 - 도배 및 광고 글 게재 - 불법정보를 포함하는 글 게재 - 개인정보를 노출하는 글 게재 -
											청소년에게 유해한 글 게재 <br />
											3. 회원은 본 약관의 규정, 이용안내, 운영정책 등 서비스와 관련하여 공지한 내용을 준수해야 하며 당사 업무 및 서비스
											운영에 방해되는 행위를 해서는 안됩니다. <br />
											4. 회원은 전 1, 2 항을 준수하지 않아 당사나 타인에게 입힌 손해를 배상할 책임이 있습니다. <br />
											5. 당사는 다음 각 호에 해당하는 경우 서비스 제공을 중지할 수 있습니다. - 서비스용 설비의 보수 등 공사로 인한 부득이한
											경우 - 전기통신사업법에 규정된 기간통신사업자가 전기통신서비스를 중지했을 경우 - 서비스 업데이트나 정보 가공, 자료의
											갱신을 위한 시스템 유지 및 보수 작업 - 시스템 장애 해결을 위한 보수작업 - 당사의 서비스 개발 프로젝트 기간이 종료된
											경우 - 기타 불가항력적인 사유로 인하여 서비스 제공이 불가능한 경우 <br />
											6. 당사는 전항규정에 의하여 서비스의 이용을 제한하거나 정지한 때에는 그 사유 및 제한기간 등을 지체 없이 이용회원에게
											알려야 합니다.
										</P>
										<br />
										<P>
											<Title>제9조 베타서비스의 제공</Title>
											1. 당사는 서비스를 상용화하기 전, 이용자를 대상으로 테스트 목적의 베타서비스를 일정한 기간 동안 제공할 수 있습니다.
											베타서비스를 시작하는 경우 당사는 대상자들에게 베타 서비스의 내용, 제공 기간 등을 공지합니다. <br />
											2. 베타서비스는 정식 서비스가 아니므로, 베타 서비스 제공 기간 동안 서비스 내용의 변경, 추가, 수정될 수 있습니다.
											당사는 베타서비스를 제공하는 도중 예상치 못한 손해나 문제가 발생하였을 경우에 회원에게 사전 공지 없이 베타 서비스를
											종료할 수 있습니다. <br />
											3. 베타서비스로 인하여 이용자에게 손해가 발생한 경우, 회사는 이에 대한 책임을 부담하지 않습니다.
										</P>
										<br />
										<P>
											<Title>제10조 개인정보보호 의무 </Title>당사는 '정보통신망법' 등 관계 법령이 정하는 바에 따라 회원의 개인정보를
											보호하기 위해 노력합니다. 개인정보의 보호 및 사용에 대해서는 관련법 및 당사의 "개인정보 처리방침"이 적용됩니다.
										</P>
										<br />
										<P>
											<Title>제11조 게시물의 관리</Title>
											1. 당사는 회원의 게시물이 당사에서 공지한 게시물 운영정책 및 '정보통신망법', '저작권법' 등 관렵법에 위반되는 내용을
											포함하는 경우, 회원의 동의 없이 해당 게시물의 비노출 및 삭제 처리를 할 수 있습니다. <br />
											2. 당사는 다음 각 호에 해당하는 회원의 게시물은 회원에게 사전 통지없이 게시물 비노출, 삭제처리 및 회원의 자격 제한,
											정지 또는 회원탈퇴시킬 수 있습니다. <br />- 다른 회원의 신고가 3회 이상 접수된 경우 <br />- 비속어/폭언/비하/음란 등
											불쾌감을 주는 게시물 <br />- 허위 사실을 유포하는 게시물 <br />- 도배 및 광고 게시물 <br />- 불법정보를 포함하는
											게시물 - 개인정보를 노출하는 게시물 <br />- 청소년에게 유해한 게시물 <br />- 의미없는 자음 모음 나열 및 장난식 기호를
											연발한 게시물 <br />- 정치적, 이념적 편향성이 강하거나 특정 집단 및 인물을 비난 또는 홍보하는 게시물 <br />- 당사의
											운영진을 사칭하는 게시물 <br />- 서비스의 정상적인 운영을 방해하는 게시물 <br />- 기타 건전한 상식에 의거하여 게시가
											부적합하다고 판단되는 게시물
										</P>
										<br />
										<P>
											<Title>제12조 게시물의 저작권</Title>
											1. 회원이 서비스내에 게시한 게시물의 저작권을 해당 게시물의 저작자에게 귀속됩니다. <br />
											2. 회원은 자신이 서비스내에 게시한 게시물을 당사가 다음 각 호의 목적으로 사용하는 것을 허락합니다. <br />- 당사의
											서비스를 홍보하기 위한 목적으로 미디어, 통신사 등에게 게시물의 내용을 보도, 방영하게 하는 것. 단, 이 경우 당사는
											회원의 개별 동의없이 제3자에게 회원정보를 제공하지 않습니다. <br />
											3. 기타 전항의 목적 외에 당사가 회원의 게시물을 이용하고자 하는 경우에는 사전에 전화, 메일 등의 방법으로 회원의 동의를
											얻어야 합니다. <br />
											4. 회원이 서비스에 게시물을 게재하는 것은 다른 회원이 게시물을 서비스 및 서비스에 링크된 사이트 내에서 사용하거나
											당사가 검색결과로 사용하는 것을 허락한 것으로 간주합니다. <br />
											5. 회원이 이용계약을 해지 시에는 회원이 서비스에 게시한 게시물은 삭제됩니다. 다만, 다른 회원에 의해 신고를 받은
											게시물은 서비스에서는 삭제되지만 필요에 따라 당사가 1년 동안 보관할 수 있습니다.
										</P>
										<br />
										<P>
											<Title>제13조 당사의 의무</Title>
											1. 당사는 본 약관 및 관련법을 준수하고, 안정적으로 서비스를 제공하기 위해 최선을 다합니다. <br />
											2. 당사는 회원의 개인정보를 본인의 동의없이 제3자에게 제공하지 않습니다. <br />
											3. 당사는 "개인정보처리방침"을 공지하고 준수하며 회원정보를 취급함에 있어 안정성 확보 및 기술적 대책을 수립
											운영합니다. <br />
											4. 당사는 서비스 이용이나 운영과 관련된 회원의 불만사항을 접수하는 경우, 이를 지체없이 처리하여 접수일로부터 10일
											이내에 그 결과를 이메일, 전화 등의 방법으로 통지합니다. 다만, 불만사항 내용 확인 및 경위 파악, 접수 내용 처리 등에
											상당한 시간이 소요될 경우, 회사는 그 사유와 처리 일정을 회원에게 미리 통지합니다.
										</P>
										<br />
										<P>
											<Title>제14조 회원의 의무</Title>
											1. 회원은 회원 가입 및 서비스 이용 시 필요한 정보를 정확하게 입력·제공하여야 하며, 제공한 정보의 내용 변경이 발생한
											경우, 서비스에 변경된 정보를 입력하거나 회사에 알리는 방식으로 변경된 내용의 정보를 제공하여야 합니다. <br />
											2. 회원이 제1항의 의무를 이행하지 않아 서비스 이용 과정에서 받게 되는 불이익, 손해 등은 회원에게 귀속됩니다. 또한
											회사는 아래의 각 호에 해당하는 행위에 대해서도 아무런 책임을 부담하지 않습니다. <br />- 제8조 1항 내지 2항에 해당하는
											행위 <br />- 제11조 2항에 해당하는 행위 <br />
											3. 회원은 회원 아이디 및 비밀번호를 철저히 관리하여야 하며, 관리소홀 및 부정사용 등에 의해 발생하는 모든 결과의 책임은
											회원에게 있습니다. <br />
											4. 회원은 서비스를 이용하여 광고, 해킹, 음란물 유포 및 관련 상업행위, 불법 소프트웨어 배포 등을 할 수 없으며 이를 위반
											시 관계기관에 의한 구속 등 법적 조치를 당하며 회원은 이와 같은 행위와 관련하여 당사에 손해배상 의무를 집니다. <br />
											5. 회원은 서비스 이용권한을 타인에게 양도, 증여할 수 없으며 이를 담보로 제공할 수 없습니다. <br />
											6. 회원은 담담을 악의적인 목적으로 사용할 수 없습니다. 또한 회원은 악의적인 사용을 통해 당사에 대한 평판 위험을
											발생시켜서는 아니됩니다. 악의적 사용이란 담담을 사용하는 과정에서 고의적인 입력값을 통해 부당한 차별적 의견 또는
											부당한 가치 판단 등 편향적인 결과값을 발생시키는 것이 대표적이며, 그 밖에도 회원이 악의적으로 담담을 사용하여
											발생시키는 문제를 포함합니다. <br />
											7. 회원은 서비스 이용 과정에서 발생한 AI 결과값(이하 'AI 결과값')을 SNS 서비스 및 기타 방법에 의해 외부에 공개하며
											제3자에게 알리는 경우 출력 데이터에 저작권 침해, 폭력적 표현, 선정적 표현, 차별적 표현, 기타 부적절하거나 제3자에게
											기타 권리침해, 불이익, 손해, 불쾌감을 주는 정보가 포함되어 있지 않음을 반드시 확인해야합니다. AI 결과값과 관련하여
											법적∙윤리적 문제가 발생하거나, 제3자와 일체의 분쟁이 발생하는 경우 이에 대한 모든 책임은 회원에게 있습니다. 8. 회원이
											AI 결과값을 외부에 공개하는 과정에서 당사에 피해를 입힌 경우 그에 대한 법률상 책임을 부담합니다.
										</P>
										<br />
										<P>
											<Title>제15조 권리의 귀속</Title>
											서비스에 대한 저작권 및 지적재산권을 당사에 귀속됩니다. 단, 회원의 게시물은 제외합니다.
										</P>
										<br />
										<P>
											<Title>제16조 면책 및 손해배상</Title>
											1. 회원이 본 약관을 위반하여 당사에 손해가 발생하게 되는 경우, 본 약관을 위반한 회원은 당사에 발생한 모든 손해를
											배상해야 합니다. <br />
											2. 회원이 서비스를 이용하면서 행한 불법행위로 인하여 당사가 회원 이외의 제3자로부터 손해배상 청구 또는 소송 등 각종
											이의제기를 받는 경우 당해 회원은 자신의 책임과 비용으로 당사를 면책시켜야 하며 그로 인해 당사에 발생한 손해를
											배상하여야 합니다. <br />
											3. 당사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이
											면책됩니다. <br />
											4. 당사는 회원의 귀책사유로 인한 서비스의 이용장애에 대하여 책임을 지지 않습니다. <br />
											5. 당사는 회원이 서비스에 게재한 정보의 신뢰도, 정확도 등의 내용에 관해서는 책임을 지지 않습니다. <br />
											6. 당사는 회원간 또는 회원과 제3자 상호간에 서비스를 매개로 하여 발생한 분쟁에 대해서는 개입할 의무가 없으며 책임을
											지지 않습니다. <br />
											7. 회원이 자신의 아이디 또는 비밀번호 등의 관리를 소홀히 한 경우 책임을 지지 않습니다. <br />
											8. 당사는 AI 결과값의 적법성, 독창성, 배타성, 신뢰도, 정확성, 진실성, 활용 가능성, 특정 목적에의 적합성을 보장하지
											아니합니다. 당사는 회원이 서비스를 이용하여 기대하는 수익을 얻지 못한 것에 대하여 책임을 지지 않으며, 그 밖의 서비스를
											통하여 얻은 결과물로 인한 손해에 관하여 책임을 지지 않습니다. <br />
											9. AI 결과값의 이용과 관련하여 발생하는 모든 문제에 대한 책임은 회원에게 있으며, 회사는 이에 대하여 일체의 책임을 지지
											아니합니다.
										</P>
										<br />
										<P>
											<Title>제17조 (관할 법원) </Title>
											서비스 이용으로 발생한 당사와 회원 간의 재판의 관할은 민사소송법상의 관할권이 인정되는 법원으로 합니다.
										</P>
										<br />
										<P>
											<Title>&lt;부 칙&gt;</Title> 본 약관은 2023년 10월 31일부터 적용됩니다.
										</P>
									</div>
								) : (
									''
								)}
							</div>
							{/** 개인정보 수집 및 이용 동의서 체크박스 */}
							<div className='border-b-[1px] border-b-[#e5e8ec]'>
								<div className='flex justify-between'>
									<div className='flex items-center gap-2 pb-6'>
										<Input
											required
											id='second'
											type='checkbox'
											checked={checkItems.includes('second')}
											onChange={(e) => handleSingleCheck(e.target.checked, e.target.id)}
										/>
										<Label htmlFor='second'>
											<span className='font-extrabold text-orange'>(필수)</span>
											<Text>개인정보 수집 및 이용 동의서</Text>
										</Label>
									</div>
									<div className='cursor-pointer'>
										{!secondClick ? (
											<DropdownSVG width='24' onClick={handleSecondClick} />
										) : (
											<DroptopSVG width='24' onClick={handleSecondClick} />
										)}
									</div>
								</div>
								{secondClick ? (
									<div className='bg-[#F4F6F8] p-6 mb-6 rounded-[16px]'>
										<P>
											당사는 "개인정보 보호법"에 따라 아래와 같이 수집하는 개인정보의 항목, 수집 및 이용 목적, 보유 및 이용 기간을
											안내드리고 동의를 받고자 합니다.
										</P>
										<br />
										<table>
											<thead className='border-y-[1px] border-y-black'>
												<tr>
													<th className='w-1/5 border-r-[1px] border-r-black bg-[#E5E8EC] font-extrabold text-[1.2rem] md:text-[1.4rem]'>
														구분(업무명)
													</th>
													<TH>처리 목적</TH>
													<TH>수집 항목</TH>
													<th className='w-1/4 bg-[#E5E8EC] text-[1.2rem] md:text-[1.4rem] font-extrabold'>보유 및 이용기간</th>
												</tr>
											</thead>
											<tbody className='border-b-[1px] border-b-black'>
												<tr className='border-b-[1px] border-b-black'>
													<Td>회원가입 및 관리</Td>
													<Td>
														<ul>
															<TdItem>· 본인 식별·인증</TdItem>
															<TdItem>· 회원자격 유지·관리</TdItem>
															<TdItem>· 각종 고지·통지사항 전달</TdItem>
															<TdItem>· 서비스 부정가입 및 이용 방지</TdItem>
														</ul>
													</Td>
													<Td>필수: 이름, 생년월일, 휴대전화번호, 아이디, 비밀번호</Td>
													<td>
														<ul>
															<TdItem>· 회원 탈퇴 시까지</TdItem>
															<TdItem>· 서비스 종료 시까지</TdItem>
														</ul>
													</td>
												</tr>
												<tr className='border-b-[1px] border-b-black'>
													<Td>제품 및 서비스</Td>
													<Td>
														<ul>
															<TdItem>· 이용자 식별</TdItem>
															<TdItem>· 본인 여부 및 연령 확인</TdItem>
															<TdItem>· 제품 및 서비스 제공</TdItem>
															<TdItem>· 서비스 이용 내역 제공</TdItem>
															<TdItem>· 콘텐츠 제공</TdItem>
															<TdItem>· 서비스 환경의 유지·관리 및 개선</TdItem>
															<TdItem>· 품질 개선 및 고도화</TdItem>
															<TdItem>· 계약의 체결·유지·이행·관리</TdItem>
														</ul>
													</Td>
													<Td>필수: 이름, 생년월일, 아이디, 비밀번호</Td>
													<td>
														<ul>
															<TdItem>· 회원 탈퇴 시까지</TdItem>
															<TdItem>· 서비스 종료 시까지</TdItem>
														</ul>
													</td>
												</tr>
												<tr className='border-b-[1px] border-b-black'>
													<Td>신규 서비스 개발</Td>
													<Td>
														<ul>
															<TdItem>· 서비스 기획 및 개발</TdItem>
															<TdItem>· 서비스 이용 통계 분석</TdItem>
															<TdItem>· 서비스 이용 환경 구축</TdItem>
														</ul>
													</Td>
													<Td>필수: 이름, 생년월일</Td>
													<td>
														<ul>
															<TdItem>· 회원 탈퇴 시까지</TdItem>
															<TdItem>· 서비스 종료 시까지</TdItem>
														</ul>
													</td>
												</tr>
												<tr>
													<Td>고객 상담 및 문의</Td>
													<Td>
														<ul>
															<TdItem>· 제품 및 서비스 상담</TdItem>
															<TdItem>· 고객 문의 접수 및 처리</TdItem>
															<TdItem>· 고객 불만 사항 처리</TdItem>
															<TdItem>· 문의 접수 및 처리 이력관리</TdItem>
														</ul>
													</Td>
													<Td>필수: 이름, 생년월일, 휴대전화번호, 아이디, 문의 내용, 상담 내역, 서비스 이용 내역</Td>
													<td>
														<ul>
															<TdItem>· 회원 탈퇴 시까지</TdItem>
															<TdItem>· 서비스 종료 시까지</TdItem>
														</ul>
													</td>
												</tr>
											</tbody>
										</table>
										<br />
										<P>
											정보주체는 위와 같이 개인정보를 처리하는 것에 대한 동의를 거부할 권리가 있습니다. <br />
											그러나 동의를 거부할 경우 [로그인이 필요한 담담 서비스 이용]이 제한될 수 있습니다. <br />
											<br />
											이에 본인은 당사가 위와 같이 개인정보를 수집 및 이용하는데 동의합니다.
										</P>
									</div>
								) : (
									''
								)}
							</div>
						</div>
						<div className='w-full mt-6'>
							<Text className='text-sm md:text-base'>* 필수항목 거부시에는 회원가입이 제한됩니다.</Text>
						</div>
						<div className='mt-[100px] mb-[16px] text-[#666666] w-full'>
							<LargeButton text={'다음'} />
						</div>
					</form>
				</div>
			</div>
		</Layout>
	)
}

export default Signup

const P = styled.p`
	color: #383b40;

	@media screen and (max-width: 768px) {
		font-size: 1.2rem;
	}
`

const Title = styled.h1`
	color: #383b40;
	font-weight: 900;
`

const Text = styled.span`
	color: #383b40;
	font-weight: 500;

	@media screen and (max-width: 768px) {
		font-size: 1.4rem;
	}
`

const TH = styled.th`
	font-weight: 900;
	padding: 0px 0.8rem;
	white-space: nowrap;

	border-right: 1px solid black;
	width: 25%;

	background-color: #e5e8ec;

	@media screen and (max-width: 768px) {
		font-size: 1.2rem;
	}
`

const Td = styled.td`
	font-size: 1.4rem;
	border-right: 1px solid black;
	padding: 0.9rem 1.2rem;

	@media screen and (max-width: 768px) {
		font-size: 1.2rem;
	}
`

const TdItem = styled.li`
	font-size: 1.4rem;

	@media screen and (max-width: 768px) {
		font-size: 1.2rem;
	}
`

const Label = styled.label`
	display: flex;
	gap: 4px;
	cursor: pointer;
	font-weight: 900;

	@media screen and (max-width: 768px) {
		font-size: 1.4rem;
	}
`

const Input = styled.input.attrs({ type: 'checkbox' })`
	appearance: none;
	width: 24px;
	height: 24px;
	border-radius: 100%;
	border: 8px solid #e5e8ec;
	cursor: pointer;

	outline: none; // 적용 안됨

	&:checked {
		background-color: transparent;
		background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='10' fill='url(%23paint0_linear_102_3405)'/%3E%3Ccircle cx='12' cy='12' r='3' fill='white'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_102_3405' x1='2' y1='2' x2='2' y2='22' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23566391'/%3E%3Cstop offset='1' stop-color='%23324478'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E%0A");
	}
`
