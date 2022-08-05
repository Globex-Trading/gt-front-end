import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

//components
import Home from './components/pages/home';
import PushNotification from './components/common/pushNotification';
import TradingChart from './components/pages/tradingChart';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route exact path="/" element={<Home/>}/>
					<Route exact path="/chart" element={<TradingChart/>}/>
				</Routes>
				<PushNotification/>
			</div>
		</BrowserRouter>
	);
}

export default App;
