import axios from 'axios';
import config from '../config.json';
import {isTokenExpired} from './httpService';
import {logout} from './authService';

const apiUrl = config.apiURL;

//calling endpoint to get past trading data
export async function getPastTradingData(data) {

	const response = await axios.post(
		apiUrl + '/trading-data/',
		data
	);
	console.log(response);
	return response;

}

//get available symbols
export async function getAvailableSymbols() {
	console.log(apiUrl);

	const response = await axios.get(
		apiUrl + '/symbols'
	);
	console.log(response, '$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
	return response;
}

//get available provider
export async function getAvailableProviders() {

	const {data} = await axios.get(
		apiUrl + '/providers'
	);
	return data;
}

//add new alert
export async function addNewAlert(alert) {
	const token = localStorage.getItem('user_token');

	if (!token || isTokenExpired()) {
		console.log('token expired');
		logout();
		return null;
	}
	const response = await axios.post(
		apiUrl + '/alerts/add-alert',
		alert,
		{
			'headers': {'Authorization': `Bearer ${token}`}
		}
	);
	console.log(response);
	return response;
}

//get existing alerts
export async function getExistingAlertsByUserID(userID) {

	const response = await axios.get(
		apiUrl + '/alerts/' + userID
	);
	console.log(response);
	return response;
}
