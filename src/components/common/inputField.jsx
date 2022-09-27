import React from 'react';

const InputField = (props) => {
	return (
		<div className="form-outline mb-4">
			<label className={'form-label text-left' + props.labelStyle} htmlFor={props.name}>{props.label}</label>
			<input
				type={props.type}
				id={props.name}
				name={props.name}
				className={'form-control border ' + props.inputStyle}
				onChange={props.onChange}
				value={props.value}
			/>
			<p className='text-danger'>{props.error}</p>
		</div>
	);
};

export default InputField;