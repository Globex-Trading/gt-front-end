import React from 'react';
import {render, screen, cleanup} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import Login from '../login';


describe('Login', () => {
	afterEach(() => {
		cleanup();
	});

	test('render Login', () => {
		render(<Router><Login/></Router>);
		const loginComponent = screen.getByTestId('login');
		//check component is rendered
		expect(loginComponent).toBeInTheDocument();
		//check component has div element
		expect(loginComponent).toContainHTML('div');
	});

	test('render Loading', () => {
		render(<Router><Login/></Router>);
		const loadingComponent = screen.getByTestId('preloader');
		//check component is rendered
		expect(loadingComponent).toBeInTheDocument();
		//check component has div element
		expect(loadingComponent).toContainHTML('div');
	});

	test('render input field', () => {
		render(<Router><Login/></Router>);
		const inputComponent = screen.getAllByTestId('input-field');
		//check component is rendered
		inputComponent.map((input) => {
			expect(input).toBeInTheDocument();
		});
	});
});
