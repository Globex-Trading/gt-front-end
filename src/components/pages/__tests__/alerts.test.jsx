import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Alerts from '../alerts';
import {rest} from 'msw';
import {setupServer} from 'msw/node';

const server = setupServer(

	rest.get('https://www.teamone.shop:3000/alerts', (req, res, ctx) => {
		return res(ctx.json({}));
	})
);
beforeAll(() => server.listen());
afterEach(() => {
	cleanup();
	server.resetHandlers();
});
afterAll(() => server.close());

test('render Alerts', () => {
	render(<Alerts />);
	const alertsComponent = screen.getByTestId('alerts');
	//check component is rendered
	expect(alertsComponent).toBeInTheDocument();
	//check component has div element
	expect(alertsComponent).toContainHTML('table');
});

test('render Loader', () => {
	render(<Alerts />);
	const header = screen.getByTestId('preloader');
	expect(header).toBeInTheDocument();
	expect(header).toContainHTML('div');
});
