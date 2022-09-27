import axios from 'axios';
import config from '../config.json';

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
