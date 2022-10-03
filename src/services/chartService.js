import axios from 'axios';
import config from '../config.json';

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

	const response = await axios.post(
		apiUrl + '/alerts',
		alert
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
