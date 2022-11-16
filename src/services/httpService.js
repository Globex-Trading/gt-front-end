import axios from 'axios';
import config from '../config.json';
import {reNewToken} from './authService';

export function isTokenExpired() {
	const token = localStorage.getItem('user_token');
	if (!token) return  true;
	const payload = JSON.parse(atob(token.split('.')[1]));
	return payload.exp < Date.now() / 1000;
}

const apiURL = config.apiURL;
const axiosAPIInstance = axios.create();

axiosAPIInstance.interceptors.request.use(
	async config => {
		config.headers = {
			'Authorization': `Bearer ${localStorage.getItem('user_token')}`,
			'Content-Type': 'application/x-www-form-urlencoded',
			'Accept-Type': 'application/json'
		};
		return config;
	},
	error => {
		Promise.reject(error);
	});

axiosAPIInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;
		if (error.response.status === 401 && !originalRequest._retry) {
			console.log('-------------error-----------', error);
			originalRequest._retry = true;
			const access_token = await reNewToken();
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
			console.log('-------------access_token-----------', axios.defaults.headers.common['Authorization']);
			return axiosAPIInstance(originalRequest);
		}
		return Promise.reject(error);
	});

export default axiosAPIInstance;





