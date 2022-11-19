import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import FileUpload from '../fileUpload';
import {setupServer} from 'msw/node';
import {rest} from 'msw';
import config from '../../../config';

const apiURL = config.apiURL;

const server = setupServer(
	rest.get(`${apiURL}/providers`, (req, res, ctx) => {
		return res(ctx.json({data: []}));
	}),
	rest.get(`${apiURL}/symbols`, (req, res, ctx) => {
		return res(ctx.json({data: []}));
	})
);

server.listen();


describe('FileUpload', () => {
	beforeAll(() => server.listen());
    afterEach(() => {
    	cleanup();
    	server.resetHandlers();
    });
    afterAll(() => server.close());

	test('render FileUpload', () => {
		render(
			<Router>
				<FileUpload />
			</Router>
		);
		const watchlistComponent = screen.getByTestId('file-upload');
		//check component is rendered
		expect(watchlistComponent).toBeInTheDocument();
		//check component has div element
		expect(watchlistComponent).toContainHTML('div');
	});

	test('render Loading', () => {
		render(
			<Router>
				<FileUpload />
			</Router>
		);
		const loadingComponent = screen.getByTestId('preloader');
		//check component is rendered
		expect(loadingComponent).toBeInTheDocument();
		//check component has div element
		expect(loadingComponent).toContainHTML('div');
	});

	test('render symbol select', () => {
		render(
			<Router>
				<FileUpload />
			</Router>
		);
		const tableComponent = screen.getByTestId('symbol-select');
		//check component is rendered
		expect(tableComponent).toBeInTheDocument();
		//check component has div element
		expect(tableComponent).toContainHTML('select');
	});

	test('render interval select', () => {
		render(
			<Router>
				<FileUpload />
			</Router>
		);
		const tableComponent = screen.getByTestId('interval-select');
		//check component is rendered
		expect(tableComponent).toBeInTheDocument();
		//check component has div element
		expect(tableComponent).toContainHTML('select');
	});
});