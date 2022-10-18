import React, { createContext, useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import config from '../../config.json';
import { over } from 'stompjs';
import { getUser } from '../../services/authService';

const { wsURL } = config;
const StoreContext = createContext({});

const StateProvider = ({ children }) => {
	const [state, setState] = useState({ user: null, stompClient: null });

	console.log('state', state);

	// useEffect for create the websocket connection and fetch data
	useEffect(() => {
		let sock = new SockJS(wsURL);
		let stompClient = over(sock);
		stompClient.connect({}, () => onConnected(stompClient), onError);
		getUserDetails();
	}, []);

	const onConnected = (client) => {
		setState({ ...state, ['stompClient']: client });
	};

	const onError = (error) => {
		console.log('error occured', error);
		setState({ ...state, ['stompClient']: null });
	};

	const getUserDetails = async () => {
		const user = await getUser();
		setState({ ...state, [user]: user });
	};

	return (
		<StoreContext.Provider value={{ state, setState }}>
			{children}
		</StoreContext.Provider>
	);
};

export default StateProvider;
export { StoreContext };
