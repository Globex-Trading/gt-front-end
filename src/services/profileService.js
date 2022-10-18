import config from '../config.json';
import axios from 'axios';

const apiURL = config.apiURL;

const access_token = localStorage.getItem('user_token');

export async function getWatchList(userId) {
	try {
		return await axios.post(
			apiURL + '/watchlist/getitemlist',
			{userId: userId},
			{headers: {'Authorization': `Bearer ${access_token}`}}
		);
	}catch (e) {
		console.log(e);
		return null;
	}
}