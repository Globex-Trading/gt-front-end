import axios from 'axios';
import config from '../config.json';

const apiURL = config.apiURL;

export async function saveFCMToken(token, userId, access_token) {
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