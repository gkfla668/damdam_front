import { useState } from 'react'
import Select, { components } from 'react-select'
import DropdownSVG from 'public/icons/btn_arrow_bottom.svg'

interface Props {
	type?: string
	name?: string
	value?: string | number
	initValue?: any
	options?: any[]
	label?: string
	labelRight?: string | JSX.Element
	info?: string
	error?: string
	subText?: string
	placeholder?: string
	required?: boolean
	//-edit func
	pattern?: string
	inputmode?: string
	editable?: boolean

	leftIcon?: any
	rightIcon?: any
	onFocus?: any
	onChange?: any
	onSubmit?: any
	style?: any
	boxClass?: string
	inputClass?: string
	placeholderClass?: string

	min?: number
	max?: number
	step?: number
	maxLength?: number
	rows?: number
	cols?: number
	disabled?: boolean
	autoFocus?: boolean
	autoComplete?: string
}

const TextInput = ({
	type,
	name,
	value,
	options,

	label,
	info,
	error,
	placeholder,
	editable,
	required = false,

	rightIcon,
	pattern,
	inputmode,

	onFocus,
	onChange,
	onSubmit,

	style,
	boxClass,
	inputClass,
	placeholderClass,

	maxLength,
	disabled = false,
	autoFocus,
	autoComplete,
	...others
}: Props) => {
	const password = type === 'password'
	const [edit, setEdit] = useState<boolean>(false)
	const [focus, setFocus] = useState<boolean>(false)
	const input_type = password ? 'text' : type ? type : 'text'

	const DropdownIndicator = (props: any) => {
		return (
			<components.DropdownIndicator {...props}>
				<div style={{ rotate: props.selectProps.menuIsOpen ? '180deg' : '0' }}>
					<DropdownSVG width={24} height={24} />
				</div>
			</components.DropdownIndicator>
		)
	}

	return (
		<div className={`w-full ${boxClass}`} style={style}>
			{/* 상단 라벨 영역 */}
			<div className='flex flex-row justify-between items-center w-full'>
				{label && (
					<span className={`flex flex-row items-start text-base text-neutral-800 font-medium`}>
						{label}
						{required && <span className='text-sm text-point-900'>&nbsp;*</span>}
					</span>
				)}
			</div>

			{/* 입력 구분에 따라 select/input 구분 + 에디터 boolean */}
			<div className={`flex flex-row items-center relative`}>
				{editable === true && edit === false ? (
					<div className='flex flex-row items-center gap-4 cursor-pointer' onClick={() => setEdit(!edit)}>
						<span className={placeholderClass}>{value || placeholder}</span>
					</div>
				) : type === 'select' ? (
					<Select
						name={name}
						value={value ? { value, label: value } : undefined}
						className={`input input-select border-none ${(error && !focus && 'error') || ''}  ${inputClass || ''}`}
						classNamePrefix={'select'}
						onChange={(val: any) => onChange && onChange(val?.value)}
						placeholder={placeholder}
						options={options}
						// disabled={disabled}
						// multiple={false}
						onFocus={() => setFocus(true)}
						onBlur={() => setFocus(false)}
						components={{ DropdownIndicator }}
						{...others}
					/>
				) : (
					<input
						name={name}
						type={input_type}
						value={value}
						onSubmit={onSubmit}
						onChange={(e) => onChange && onChange(e.target.value)}
						onKeyDown={(e) => e.key === 'Enter' && onSubmit && onSubmit()}
						placeholder={placeholder}
						className={`input ${(error && !focus && !value && 'error') || ''} ${inputClass || ''} ${(!value && placeholderClass) || ''}`} // ${info && 'border-blue-600'} ${error && 'border-red-500'}
						pattern={pattern}
						inputMode={inputmode as any}
						maxLength={maxLength}
						disabled={disabled}
						autoFocus={autoFocus}
						autoComplete={autoComplete}
						onFocus={() => {
							setFocus(true)
							onFocus && onFocus()
						}}
						onBlur={() => setFocus(false)}
						{...others}
					/>
				)}

				{rightIcon ? <div className='absolute right-4 h-full flex flex-col justify-center'>{rightIcon}</div> : undefined}
			</div>

			{/* 하단 텍스트 영역 info/error 시 표출 */}
			{info && <p className={`text-xxs mt-1 text-blue-600 font-normal`}>{info}</p>}
			{error && !focus && <p className={`text-xs mt-1 ml-1 text-red-600 font-normal flex flex-row items-center`}>{error}</p>}
		</div>
	)
}

export default TextInput
