import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Watchlist from '../watchlist';
import {setupServer} from 'msw/node';
import config from '../../../config';
import {rest} from 'msw';

const apiURL = config.apiURL;


const server = setupServer(
	rest.post(`${apiURL}/watchlist/getitemlist`, {userID: '1234'}, (req, res, ctx) => {
		return res(ctx.json({data: []}));
	}), 
	rest.get(`${apiURL}/symbols`, (req, res, ctx) => {
		return res(ctx.json({data: []}));
	})
);


describe('Watchlist', () => {
	beforeAll(() => server.listen());
    afterEach(() => {
    	cleanup();
    	server.resetHandlers();
    });
    afterAll(() => server.close());
    
	test('render Watchlist', () => {
		render(
			<Router>
				<Watchlist />
			</Router>
		);
		const watchlistComponent = screen.getByTestId('watchlist');
		//check component is rendered
		expect(watchlistComponent).toBeInTheDocument();
		//check component has div element
		expect(watchlistComponent).toContainHTML('table');
	});
    
	test('render Loading', () => {
		render(
			<Router>
				<Watchlist />
			</Router>
		);
		const loadingComponent = screen.getByTestId('preloader');
		//check component is rendered
		expect(loadingComponent).toBeInTheDocument();
		//check component has div element
		expect(loadingComponent).toContainHTML('div');
	});
});