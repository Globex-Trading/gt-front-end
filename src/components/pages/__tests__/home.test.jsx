import React from 'react';
import {screen, cleanup, render} from '@testing-library/react';
import Home from '../home';
import {BrowserRouter as Router} from 'react-router-dom';

describe('Home', () => {
	afterEach(() => {
		cleanup();
	});

	test('render Home', () => {
		render(<Router><Home /></Router>);
		const homeComponent = screen.getByTestId('home');
		//check component is rendered
		expect(homeComponent).toBeInTheDocument();
		//check component has div element
		expect(homeComponent).toContainHTML('div');
	});

	test('render Loading', () => {
		render(<Router><Home /></Router>);
		const loadingComponent = screen.getByTestId('preloader');
		//check component is rendered
		expect(loadingComponent).toBeInTheDocument();
		//check component has div element
		expect(loadingComponent).toContainHTML('div');
	});
    
});