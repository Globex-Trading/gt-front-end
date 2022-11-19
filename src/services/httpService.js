import axios from 'axios';
import config from '../config.json';
import {logout, reNewToken} from './authService';

export function isTokenExpired(token = localStorage.getItem('user_token')) {
	if (!token) return  true;
	const payload = JSON.parse(atob(token.split('.')[1]));
	return payload.exp < Date.now() / 1000;
}

const apiURL = config.apiURL;
const axiosAPIInstance = axios.create();

// 'Content-Type': 'application/x-www-form-urlencoded',

axiosAPIInstance.interceptors.request.use(
	async config => {
		config.headers = {
			'Authorization': `Bearer ${localStorage.getItem('user_token')}`,
			'Content-Type': 'application/json',
			'Accept-Type': 'application/json'
		};
		return config;
	},
	error => {
		Promise.reject(error);
	});

axiosAPIInstance.interceptors.response.use(
	(response) => {
		console.log('response!!!!!!!!!!!!!!!!!!!', response);
		return response;
	},
	async function (error) {
		const originalRequest = error.config;
		console.log('------retry------------------',originalRequest._retry);
		if (error.response.status.toString() === '401' && !originalRequest._retry) {
			originalRequest._retry = true;
			console.log('-------------error-----------', error);
			originalRequest._retry = true;
			try {
				const access_token = await reNewToken();
				axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
				console.log('-------------access_token-----------', axios.defaults.headers.common['Authorization']);
				return axiosAPIInstance(originalRequest);
			}catch (e) {
				logout();
				return Promise.reject(error);
			}
		}
		return Promise.reject(error);
	});

export default axiosAPIInstance;





