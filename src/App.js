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

function App() {
	const [isLoading, setIsLoading] = React.useState(true);


	return (
		<BrowserRouter>
			<div className="App">
				{/*====== Preloader Area Start ======*/}
				<PreLoader isLoading={isLoading}/>
				{/*====== Preloader Area End ======*/}
				<div className="main overflow-hidden">
					<Header/>
					<Routes>
						<Route path="/login" element={<Login setIsLoading={setIsLoading}/>}/>
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
