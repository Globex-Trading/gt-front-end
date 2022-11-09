import React, { useEffect, useState, Fragment } from 'react';
import { onMessageListener, requestToken } from '../../firebase.config';
import toast, { Toaster } from 'react-hot-toast';

const PushNotification = () => {
	const [notification, setNotification] = useState({ title: '', body: '' });

	const notify = () => {
		console.log('adding notification');
		return toast(
			<div>
				<p>
					<b>{notification?.title}</b>
				</p>
				<p>{notification?.body}</p>
			</div>
		);
	};

	useEffect(() => {
		if (notification.title) {
			notify();
		}

		
	}, [notification]);

	requestToken();

	onMessageListener()
		.then((payload) => {
			console.log(payload, '-----------------------------------');
			setNotification({
				title: payload?.notification?.title,
				body: payload?.notification?.body,
			});
		})
		.catch((error) => {
			console.log(error);
		});

	return (
		<Fragment>
			<Toaster
				data-testid="toaster"
				position="top-right"
				reverseOrder={false}
			/>
		</Fragment>
	);
};

export default PushNotification;
