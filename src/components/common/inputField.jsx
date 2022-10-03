import React from 'react';
import {FloatingLabel, Form} from 'react-bootstrap';

const InputField = (props) => {
	return (
		<div className="form-outline mb-4">
			<label data-testid="label" className={'form-label text-left label-font' + props.labelStyle} htmlFor={props.name}>{props.label}</label>
			<input data-testid="inputs"
				type={props.type}
				id={props.name}
				name={props.name}
				className={'form-control border input-size' + props.inputStyle}
				onChange={props.onChange}
				value={props.value} disabled={props.disabled}
			/>
			<p className='text-danger'>{props.error}</p>
		</div>
	);
};

export default InputField;