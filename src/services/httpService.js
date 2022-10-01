export function isTokenExpired() {
	const token = localStorage.getItem('user_token');
	if (!token) return  true;
	const payload = JSON.parse(atob(token.split('.')[1]));
	return payload.exp < Date.now() / 1000;
}



