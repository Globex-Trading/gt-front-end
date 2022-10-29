import {initializeApp} from 'firebase/app';
import {getMessaging, getToken, onMessage} from 'firebase/messaging';

const firebaseConfig = {
	apiKey: 'AIzaSyBt6-7FyCeGkJ5TvsAAQDgtAu4uPKLMG1A',
	authDomain: 'gt-push-notifications.firebaseapp.com',
	projectId: 'gt-push-notifications',
	storageBucket: 'gt-push-notifications.appspot.com',
	messagingSenderId: '353973843098',
	appId: '1:353973843098:web:f03816a951e66d08655b23'
};
const firebaseApp = initializeApp(firebaseConfig);

const messaging = getMessaging(firebaseApp);

export const requestToken = async() => {
	try {
		const token = await getToken(messaging, {
			vapidKey: 'BC9YjcLJcCIpYizlPHB-GiiBPGQp4y_D9ir-NVioliklQjZRJIP84rVhPl48-jLSdenBHf4uCpSevJ7SbUE1w-8',
		});
		localStorage.setItem('fcm_token', token);
		console.log('firebase-token', token);
		console.log('[firebase-config.js] Token: ', token);
	} catch (error) {
		console.log(error);
	}
};

export const onMessageListener = () => {
	return new Promise((resolve) => {
		onMessage(messaging, (payload) => {
			console.log('[firebase-config.js] Received message: ', payload);
			resolve(payload);
		});
	});
};



