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
	console.log('register', response);
	return response;
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
	localStorage.removeItem('user_id');
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
	localStorage.setItem('user_id', res.data?.id);
	return res.data;

}
