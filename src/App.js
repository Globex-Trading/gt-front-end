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

// let user;
// let store;

function App() {

	// useEffect(() => {
	// 	user = getUserDetails();
	// }, []);
	//
	// //get user details if user is logged in
	// const getUserDetails = async () => {
	// 	const user = await getUser();
	// 	return user;
	// };
	//
	// //set up a context store
	// const initialState = {user: user};
	// store = createContext(initialState);
	// const {Provider} = store;
	//
	// //set up a reducer
	// const StateProvider = ({children}) => {
	// 	const [state, dispatch] = useReducer((state, action) => {
	// 		switch (action.type) {
	// 		case 'SAVE_USER':
	// 			return {
	// 				user: action.payload
	// 			};
	// 		case 'REMOVE_USER':
	// 			return {
	// 				user: null
	// 			};
	// 		}
	// 	}, initialState);
	//
	// 	return <Provider value={{state, dispatch}}>{children}</Provider>;
	// };
	//
	//

	return (
		<StateProvider>
			<BrowserRouter>
				<div className="App">
					<div className="main overflow-hidden">
						<Header/>
						<Routes>
							<Route path="/register" element={<Register/>}/>
							<Route path="/profile/watchlist" element={<ProtectedRoute/>}>
								<Route path="/profile/watchlist" element={<Watchlist/>}/>
							</Route>
							<Route path="/logout" element={<Logout/>}/>
							<Route path="/login" element={<Login/>}/>
							<Route path="/chart" element={<TradingChart/>}/>
							<Route path="/" exact element={<Home/>}/>
							<Route path="*" element={<Page404/>}/>
						</Routes>
					</div>
					{/*<PushNotification/>*/}
				</div>
			</BrowserRouter>
		</StateProvider>
	);
}

export default App;
// export {store};
