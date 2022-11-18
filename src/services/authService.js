import axios from 'axios';
import config from '../config.json';
import axiosAPIInstance from './httpService';

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
		localStorage.setItem('refresh_token', response.data.refresh_token);
		localStorage.setItem('user_id', response.data._id);
		return true;
	} else {
		return false;
	}
}


//logout user
export function logout() {
	localStorage.removeItem('user_token');
	localStorage.removeItem('refresh_token');
	localStorage.removeItem('user_id');
}

//get user details
export async function getUser() {
	const token = localStorage.getItem('user_token');

	// if (!token || isTokenExpired()) {
	// 	logout();
	// 	return null;
	// }

	const res = await axiosAPIInstance.get(
		apiUrl + '/users/me',
		{
			'headers': {'Authorization': `Bearer ${token}`}
		}
	);
	localStorage.setItem('user_id', res.data?.id);
	return res.data;

}

export async function reNewToken() {
	const refreshToken = localStorage.getItem('refresh_token');
	try {
		const res = await axios.post(
			apiUrl + '/users/renewToken',
			{refresh_token: refreshToken}
		);

		if (res.data?.token) {
			localStorage.setItem('user_token', res.data.token);
			localStorage.setItem('refresh_token', res.data.refresh_token);
			return res.data.token;
		}else {
			logout();
			return null;
		}
	}catch (e) {
		console.log(e);
		logout();
		return null;
	}

}
