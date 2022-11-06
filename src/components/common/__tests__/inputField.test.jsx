import React from 'react';
import {render, screen, cleanup, fireEvent} from '@testing-library/react';
import InputField from '../inputField';

const setup = (onChange = jest.fn(), value='') => {
	const utils = render(
		<InputField
			name='name'
			label='Name'
			value={value}
			onChange={onChange}
			disabled={false}
			type='text'
			labelStyle=''
			inputStyle=''
			error=''
		/>
	);
	return utils;
};

afterEach(() => cleanup());

test('render InputField', () => {

	setup();
	const inputFieldComponent = screen.getByTestId('input-field');
	//check component is rendered
	expect(inputFieldComponent).toBeInTheDocument();

});

test('render InputField with label', () => {
	const utils = setup();
	const label = utils.getByLabelText('Name');
	expect(label).toBeInTheDocument();
});

test('render InputField with input', () => {
	const utils = setup();
	const input = utils.getByTestId('inputs');
	expect(input).toBeInTheDocument();
});

test('change InputField value', () => {
	const testValue = 'test';
	const onChange = jest.fn();
	onChange.mockReturnValue(testValue);
	const utils = setup(onChange, onChange());
	const input = utils.getByTestId('inputs');
	fireEvent.change(input, {target: {value: testValue}});
	expect(input.value).toBe(testValue);
});