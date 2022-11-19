import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Profile from '../profile';
import {setupServer} from 'msw/node';
import config from '../../../config';
import {rest} from 'msw';

const apiURL = config.apiURL;


const server = setupServer(
	rest.get(`${apiURL}/users/me`, (req, res, ctx) => {
		return res(ctx.json({}));
	}),
	rest.post(`${apiURL}/watchlist/getitemlist`, {userID: '1234'}, (req, res, ctx) => {
        return res(ctx.json([]));
    }),
    rest.get(`${apiURL}/alerts/:userID`, (req, res, ctx) => {
    		return res(ctx.json({}));
    }),
);


describe('Profile', () => {
	beforeAll(() => server.listen());
    afterEach(() => {
    	cleanup();
    	server.resetHandlers();
    });
    afterAll(() => server.close());

	test('render Profile', () => {
		render(
			<Router>
				<Profile />
			</Router>
		);
		const fileUploadComponent = screen.getByTestId('profile');
		//check component is rendered
		expect(fileUploadComponent).toBeInTheDocument();
		//check component has div element
		expect(fileUploadComponent).toContainHTML('div');
	});

	test('render Loading', () => {
		render(
			<Router>
				<Profile />
			</Router>
		);
		const loadingComponent = screen.getByTestId('preloader');
		//check component is rendered
		expect(loadingComponent).toBeInTheDocument();
		//check component has div element
		expect(loadingComponent).toContainHTML('div');
	});

	test('render watchlist tables', () => {
		render(
			<Router>
				<Profile />
			</Router>
		);
		const tableComponent = screen.getByTestId('watchlist-table');
		//check component is rendered
		expect(tableComponent).toBeInTheDocument();
		//check component has div element
		expect(tableComponent).toContainHTML('table');
	});

	test('render alert table', () => {
		render(
			<Router>
				<Profile />
			</Router>
		);
		const tableComponent = screen.getByTestId('alert-table');
		//check component is rendered
		expect(tableComponent).toBeInTheDocument();
		//check component has div element
		expect(tableComponent).toContainHTML('table');
	});
});