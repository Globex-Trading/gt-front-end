import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Notifications from '../notifications';
import {setupServer} from 'msw/node';
import config from '../../../config';
import {rest} from 'msw';

const apiURL = config.apiURL;


const server = setupServer(
	rest.post(`${apiURL}/notification/getnotification`, (req, res, ctx) => {
		return res(ctx.json({data: []}));
	})
);


describe('Notifications', () => {
	beforeAll(() => server.listen());
    afterEach(() => {
    	cleanup();
    	server.resetHandlers();
    });
    afterAll(() => server.close());
	test('render Notifications', () => {
		render(
			<Router>
				<Notifications />
			</Router>
		);
		const watchlistComponent = screen.getByTestId('notifications');
		//check component is rendered
		expect(watchlistComponent).toBeInTheDocument();
		//check component has div element
		expect(watchlistComponent).toContainHTML('table');
	});

	test('render Loading', () => {
		render(
			<Router>
				<Notifications />
			</Router>
		);
		const loadingComponent = screen.getByTestId('preloader');
		//check component is rendered
		expect(loadingComponent).toBeInTheDocument();
		//check component has div element
		expect(loadingComponent).toContainHTML('div');
	});
});