import React, {Fragment, useContext, useEffect, useState} from 'react';
import PreLoader from '../common/loader';
import {StoreContext} from '../common/stateProvider';
import {getNotifications} from '../../services/profileService';
import toast from 'react-hot-toast';
import DataTable from 'react-data-table-component';


const Notifications = () => {

	const [isLoading, setIsLoading] = useState(true);
	const [notifications, setNotfications] = useState([]);

	const userId = localStorage.getItem('user_id');


	useEffect(() => {
		setIsLoading(true);
		getExistingNotification();
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);

	}, []);


	const columns = [
		{
			name: 'Title',
			selector: row=>row.title,
			sortable: true,
		},
		{
			name: 'Data',
			selector: row=>row.data,
			sortable: true,
		},
	];


	const getExistingNotification = async() => {
		setIsLoading(true);
		try {
			const response = await getNotifications(userId);
			if(response.status === 201) {
				setNotfications(response.data);
			}else {
				toast.error('Error while fetching notifications');
			}
		}catch (e) {
			console.log(e);
			toast.error('Error occurred!');
		}
		setIsLoading(false);
	};

	const myStyle1={
		backgroundImage: 'url(/assets/img/white-bg.jpg)',
		backgroundSize: 'cover',
		height: '100vh',
		opacity: '0.9'
	};

	return (
		<Fragment>
			<PreLoader isLoading={isLoading}/>
			<section
			    data-testid="notifications"
				id="alerts"
				className="section bg-overlay overflow-hidden"
			>
				<div className='watchlist-container d-flex justify-content-center' style={myStyle1}>
					<div className='container'>
						<DataTable
							columns={columns}
							data={
								notifications.map((item) => {
									return (
										{
											id: item.id,
											title: item.title,
											data: item.data,
										}
									);
								})
							}
							pagination
							fixedHeader
							fixedHeaderScrollHeight="300px"
							// progressPending={isPending}
						/>

					</div>
				</div>
			</section>
		</Fragment>
	);
};

export default Notifications;