/* eslint-disable */ 
import { render, fireEvent, screen } from '@testing-library/react';
import Chart from '../../common/chart';
const mockedModule = jest.mock('lightweight-charts');

module.exports = mockedModule;

test('check input field has all fields', () => {

// render the component on virtual dom

  
	render(<Chart isLoading={true}/>);

	//select the elements you want to interact with
    const counter = screen.getByTestId('chart-loarder');

	//interact with those elements
	// fireEvent.click(incrementBtn);

	//assert the expected result
	expect(counter).toBeInTheDocument();
});