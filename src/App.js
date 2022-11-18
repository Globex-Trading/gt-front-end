import React, {createContext, Fragment, useEffect, useReducer, useState} from 'react';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

//components
import Home from './components/pages/home';
import PushNotification from './components/common/pushNotification';
import TradingChart from './components/pages/tradingChart';
import Login from './components/pages/login';
import Header from './components/common/header';
import Register from './components/pages/register';
import Logout from './components/pages/logout';
import StateProvider from './components/common/stateProvider';
import Watchlist from './components/pages/watchlist';
import Page404 from './components/pages/404';
import ProtectedRoute from './components/common/protectedRoute';
import Profile from './components/pages/profile';
import Alerts from './components/pages/alerts';
import FileUpload from './components/pages/fileUpload';
import Notifications from './components/pages/notifications';

function App() {
	return (
		<StateProvider>
			<BrowserRouter>
				<div className="App">
					<div className="main overflow-hidden">
						<Header/>
						<Routes>
							<Route path="/register" element={<Register/>}/>
							<Route path="/profile/alerts" element={<ProtectedRoute userTypes={['USER', 'ADMIN']}/>}>
								<Route path="/profile/alerts" element={<Alerts/>}/>
							</Route>
							<Route path="/profile/watchlist" element={<ProtectedRoute userTypes={['USER', 'ADMIN']}/>}>
								<Route path="/profile/watchlist" element={<Watchlist/>}/>
							</Route>
							<Route path="/profile" element={<ProtectedRoute userTypes={['USER', 'ADMIN']}/>}>
								<Route path="/profile" element={<Profile/>}/>
							</Route>
							<Route path="/stock-data" element={<ProtectedRoute userTypes={['ADMIN']}/>}>
								<Route path="/stock-data" element={<FileUpload/>}/>
							</Route>
							<Route path="/profile/notifications" element={<ProtectedRoute userTypes={['USER', 'ADMIN']}/>}>
								<Route path="/profile/notifications" element={<Notifications/>}/>
							</Route>
							<Route path="/logout" element={<Logout/>}/>
							<Route path="/login" element={<Login/>}/>
							<Route path="/chart" element={<TradingChart/>}/>
							<Route path="/" exact element={<Home/>}/>
							<Route path="*" element={<Page404/>}/>
						</Routes>
					</div>
					<PushNotification/>
				</div>
			</BrowserRouter>
		</StateProvider>
	);
}

export default App;
// export {store};
