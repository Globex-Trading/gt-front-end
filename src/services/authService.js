import axios from 'axios';
import config from '../config.json';
import {isTokenExpired} from './httpService';

const apiUrl = config.apiURL;

//calling endpoint to get token
export async function login(data) {
	console.log('login');
	const response = await axios.post(
		apiUrl + '/users/login',
		data);

	return saveUser(response);
}

//registering user
export async function register(data) {
	const response =  await axios.post(
		apiUrl + '/users',
		data
	);
	return saveUser(response);
}

//save user
function saveUser(response) {
	console.log('saveUser', response);
	if (response.data?.token) {
		localStorage.setItem('user_token', response.data.token);
		return true;
	} else {
		return false;
	}
}


//logout user
export function logout() {
	localStorage.removeItem('user_token');
}

//get user details
export async function getUser() {
	const token = localStorage.getItem('user_token');

	if (!token || isTokenExpired()) {
		logout();
		return null;
	}

	const res = await axios.get(
		apiUrl + '/users/me',
		{
			'headers': {'Authorization': `Bearer ${token}`}
		}
	);
	console.log('getUser', res);
	return res.data;

}
