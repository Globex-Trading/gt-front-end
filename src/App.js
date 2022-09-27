import React from 'react';
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

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<div className="main overflow-hidden">
					<Header/>
					<Routes>
						<Route path="/register" element={<Register/>}/>
						<Route path="/login" element={<Login/>}/>
						<Route path="/chart" element={<TradingChart/>}/>
						<Route path="/" element={<Home/>}/>
					</Routes>
				</div>
				<PushNotification/>
			</div>
		</BrowserRouter>
	);
}

export default App;
