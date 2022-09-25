import axios from 'axios';
import { apiUrl } from '../config.json';

//calling endpoint to get token
export async function login(username, password) {
	const response = await axios.post(
		apiUrl + '/login', 
		{ username, password });
	return response;

    
}
