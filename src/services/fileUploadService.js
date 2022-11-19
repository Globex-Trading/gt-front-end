import axios from 'axios';

export async function uploadFile(file, symbolID, timeInterval) {
	const token = localStorage.getItem('user_token');
	const formData = new FormData();
	formData.append('file', file);
	formData.append('symbolID', symbolID);
	formData.append('timeInterval', timeInterval);
	try {
		const response = await axios.post('/api/upload', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				'Authorization': `Bearer ${token}`
			},
		});
		return response.data;
	}catch (e) {
		console.log(e);
	}
}
