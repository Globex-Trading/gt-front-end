import React from 'react';
import {render, screen, cleanup} from '@testing-library/react';
import Loader from '../loader';

afterEach(() => cleanup());

test('render Loader', () => {
	render(<Loader isLoading={true}/>);
	const loaderComponent = screen.getByTestId('preloader');
	//check component is rendered
	expect(loaderComponent).toBeInTheDocument();
});