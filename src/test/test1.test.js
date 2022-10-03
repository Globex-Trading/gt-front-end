/* eslint-disable */ 
import { render, fireEvent, screen } from '@testing-library/react';
import Counter from '../components/common/Counter';
import {shallow} from 'enzyme';


// import Adapter from 'enzyme-adapter-react-16';
// Enzyme.configure({adapter: new Adapter()});

//test block
test('increments counter', () => {
// render the component on virtual dom
	render(<Counter />);

	//select the elements you want to interact with
	const counter = screen.getByTestId('counter');
	const incrementBtn = screen.getByTestId('increment');
	

	//interact with those elements
	fireEvent.click(incrementBtn);

	//assert the expected result
	expect(counter).toHaveTextContent("1");

	// const {wrapper} = render(<Counter/>);
    // expect(wrapper.returnaa()).equals("aa");
});