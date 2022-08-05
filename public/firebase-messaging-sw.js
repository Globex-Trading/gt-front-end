importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const firebaseConfig = {
	apiKey: 'AIzaSyBt6-7FyCeGkJ5TvsAAQDgtAu4uPKLMG1A',
	authDomain: 'gt-push-notifications.firebaseapp.com',
	projectId: 'gt-push-notifications',
	storageBucket: 'gt-push-notifications.appspot.com',
	messagingSenderId: '353973843098',
	appId: '1:353973843098:web:f03816a951e66d08655b23'
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload){
	console.log('[firebase-messaging-sw.js] Received background message ', payload);
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
