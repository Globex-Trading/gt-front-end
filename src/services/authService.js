import axios from 'axios';
import config from '../config.json';

const apiUrl = config.apiURL;

//calling endpoint to get token
export async function login(username, password) {
	return await axios.post(
		apiUrl + 'users/login',
		{username, password});

}

//registering user
export async function register(data) {
	const response =  await axios.post(
		apiUrl + '/users',
		data
	);
	if(response.data?.token) {
		localStorage.setItem('token', response.data.token);
		return true;
	}else {
		return false;
	}
}
