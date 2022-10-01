import React, {createContext, useReducer, useState} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

//components
import Home from './components/pages/home';
import PushNotification from './components/common/pushNotification';
import TradingChart from './components/pages/tradingChart';
import Login from './components/pages/login';
import Header from './components/common/header';
import Register from './components/pages/register';
import {getUser} from './services/authService';
import Logout from './components/pages/logout';

//setup store - globally accessible
const getUserDetails = async () => {
	return await getUser();
};


const initialState = {user: getUserDetails()};

export const store = createContext(initialState);

const {Provider} = store;

const StateProvider = ({children}) => {
	const [state, dispatch] = useReducer((state, action) => {
		switch (action.type) {
		case 'SAVE_USER':
			return {
				user: action.payload
			};
		case 'REMOVE_USER':
			return {
				user: null
			};
		}
	}, initialState);

	return <Provider value={{state, dispatch}}>{children}</Provider>;
};


function App() {

	const [user, setUser] = useState(null);


	return (
		<StateProvider>
			<BrowserRouter>
				<div className="App">
					<div className="main overflow-hidden">
						<Header/>
						<Routes>
							<Route path="/register" element={<Register/>}/>
							<Route path="/logout" element={<Logout/>}/>
							<Route path="/login" element={<Login/>}/>
							<Route path="/chart" element={<TradingChart/>}/>
							<Route path="/" element={<Home/>}/>
						</Routes>
					</div>
					{/*<PushNotification/>*/}
				</div>
			</BrowserRouter>
		</StateProvider>
	);
}

export default App;
