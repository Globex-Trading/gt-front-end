import React from 'react';
import {render, screen, cleanup} from '@testing-library/react';
import Page404 from '../404';

afterEach(() => cleanup());

test('render Page404', () => {
	render(<Page404/>);
	const page404Component = screen.getByTestId('page404');
	//check component is rendered
	expect(page404Component).toBeInTheDocument();
});

test('render Page404 with h1', () => {
	render(<Page404/>);
	const h1 = screen.getByText('404');
	expect(h1).toBeInTheDocument();
});

test('render Page404 with p', () => {
	render(<Page404/>);
	const p = screen.getByText('Page not found');
	expect(p).toBeInTheDocument();
});
