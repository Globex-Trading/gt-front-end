import axios from 'axios';
import {apiURL} from '../config.json';

const bearerToken = localStorage.getItem('access_token');

const axiosInstance = axios.create({
	baseURL: apiURL,
	headers: {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${bearerToken}`
	}
});

axiosInstance.interceptors.response.use(async (req) => {
	//TODO: check access token is expired or not
});



