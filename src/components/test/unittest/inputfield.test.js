/* eslint-disable */
import { render, fireEvent, screen } from '@testing-library/react';
import InputField from '../../common/inputField';


//test block
test('check input field has all fields', () => {

	// render the component on virtual dom
	render(<InputField />);
	//select the elements you want to interact with
	const counter = screen.getByTestId('inputs');

	expect(counter).toBeInTheDocument();
});

test('check input field has label ', () => {


	// render the component on virtual dom
	render(<InputField />);

	//select the elements you want to interact with
	const counter = screen.getByTestId('label');

	expect(counter).toBeInTheDocument();
});