import React, { createContext, useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import config from '../../config.json';
import { over } from 'stompjs';
import { getUser } from '../../services/authService';
import toast from 'react-hot-toast';

const { wsURL } = config;
const StoreContext = createContext({});

const StateProvider = ({ children }) => {
	// const [state, setState] = useState({ user: null, stompClient: null });
	const [user, setUser] = useState(null);
	const [stompClient, setStompClient] = useState(null);

	console.log('state--------------', user, stompClient);

	// useEffect for create the websocket connection and fetch data
	useEffect(() => {
		let sock = new SockJS(wsURL);
		let stompClient = over(sock);
		stompClient.connect({}, () => onConnected(stompClient), onError);
		const refreshToken = localStorage.getItem('refresh_token');
		refreshToken && getUserDetails();
	}, []);

	const onConnected = (client) => {
		// setState({ ...state, ['stompClient']: client });
		setStompClient(client);
	};

	const onError = (error) => {
		console.log('error occured', error);
		// setState({ ...state, ['stompClient']: null });
		setStompClient(null);
	};

	const getUserDetails = async () => {
		try{
			const user = await getUser();
			console.log('adding user details--------------------------------', user);
			// setState({ ...state, ['user']: user });
			setUser(user);
		}catch(error){
			console.log('error occured', error);
			toast.error('Error occured!');
		}
	};

	return (
		// <StoreContext.Provider value={{ state, setState }}>
		<StoreContext.Provider value={{ user, stompClient, setUser, setStompClient }}>
			{children}
		</StoreContext.Provider>
	);
};

export default StateProvider;
export { StoreContext };
