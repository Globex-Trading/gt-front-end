import React from 'react';
import {render, screen, cleanup} from '@testing-library/react';
import {MemoryRouter as Router} from 'react-router-dom';
import Header from '../header';

test('render Header', () => {
	render(<Router><Header/></Router>);
	const headerComponent = screen.getByTestId('header');
	//check component is rendered
	expect(headerComponent).toBeInTheDocument();
	//check component has nav element
	expect(headerComponent).toContainHTML('nav');
});
