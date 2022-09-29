/* eslint-disable */ 
import { render, fireEvent, screen } from '@testing-library/react';
import PreLoader from '../../common/loader';



//test block
test('check loader gives right output when isloading true', () => {
// render the component on virtual dom
	render(<PreLoader isLoading={true}/>);

	//select the elements you want to interact with
    const output = screen.getByTestId('preloader');

	//assert the expected result
	expect(output).toBeInTheDocument();
});


test('check loader gives right output when isloading fales ', () => {
    // render the component on virtual dom
    const { container }=render(<PreLoader isLoading={false}/>);
    
        expect(container).toBeEmptyDOMElement();
    });