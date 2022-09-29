// /* eslint-disable */ 
// import { render, fireEvent, screen } from '@testing-library/react';
// import Header from '../../common/header';

// const localStorageMock = {
//     getItem: jest.fn(),
//     setItem: jest.fn(),
//     clear: jest.fn()
//   };
  
// //test block
// test('check input field has all fields', () => {

// // render the component on virtual dom
//     global.localStorage = localStorageMock;

// 	render(<Header/>);

// 	//select the elements you want to interact with
//     const counter = screen.getByTestId('inputs');

// 	//interact with those elements
// 	// fireEvent.click(incrementBtn);

// 	//assert the expected result
// 	expect(counter).toBeInTheDocument();
// });