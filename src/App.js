import React, {createContext, useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

//components
import Home from './components/pages/home';
import PushNotification from './components/common/pushNotification';
import TradingChart from './components/pages/tradingChart';
import Login from './components/pages/login';
import PreLoader from './components/common/loader';
import Header from './components/common/header';
import Register from './components/pages/register';
import {isUserExpired} from './services/authService';
import Logout from './components/pages/logout';



export const UserContext = createContext(null);

function App() {

	const [user, setUser] = useState(null);

	useEffect(() => {
		getUser();
	}, []);

	const getUser = async () => {
		const user = await isUserExpired();
		setUser(user);
	};

	return (
		<UserContext.Provider value={user}>
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
					<PushNotification/>
				</div>
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;
