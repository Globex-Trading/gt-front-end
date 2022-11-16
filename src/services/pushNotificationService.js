import axios from 'axios';
import config from '../config.json';

const apiURL = config.apiURL;
const access_token = localStorage.getItem('user_token');

export async function saveFCMToken(token, userId) {
	console.log('saveFCMToken', token, userId);
	try {
		return await axios.post(apiURL + '/alerts/gettoken',
			{configToken: token, userID: userId},
			{headers: {'Authorization': `Bearer ${access_token}`}}
		);
	}catch (e) {
		console.log(e);
		return null;
	}
}