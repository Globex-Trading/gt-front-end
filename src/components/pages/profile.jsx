import React, {useEffect, useState} from 'react';
import {getUser} from '../../services/authService';
import PreLoader from '../common/loader';
import Table from 'react-bootstrap/Table';
import {getWatchList} from '../../services/profileService';
import {getExistingAlertsByUserID} from '../../services/chartService';
import toast from 'react-hot-toast';
import {Link} from 'react-router-dom';
// import bi from 'assets/img/welcome/welcome1.png';

const Profile = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState({});
	const [watchList, setWatchList] = useState([]);
	const [alerts, setAlerts] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		getUserDetails();
		getWatchlist();
		getExistingAlerts();
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);

	}, []);

	const getWatchlist = async () => {
		const userId = localStorage.getItem('user_id');
		try{
			const watchlist = await getWatchList(userId);
			if(watchlist?.data){
				setWatchList(watchlist?.data);
			}else {
				setWatchList([]);
			}
		}catch (e) {
			console.log(e);
		}
	};

	const getExistingAlerts = async() => {
		try {
			const userId = localStorage.getItem('user_id');
			const {data} = await getExistingAlertsByUserID(userId);
			if(data.status === 'SUCCESS'){
				setAlerts(data.data);
			}else {
				toast.error(data.data);
			}
		}catch (e) {
			console.log(e);
			toast.error('Error occurred!');
		}
	};


	const getUserDetails = async () => {
		try {
			const response = await getUser();
			console.log(response);
			if (response) setUser(response);
		}catch (error){
			toast.error('Error occurred!')
		}
	};

	const myStyle1={
		backgroundImage: 'url(assets/img/white-bg.jpg)',
		backgroundSize: 'cover',
		// height: '100vh',
		opacity: '0.9'
	};

	const myStyle2={
		// backgroundColor:'rgba(255, 255, 255, 0.65)',
		// backgroundSize: 'cover',
		// height: '100vh',
		// opacity: '0.7'
	};

	const pp={
		borderRadius:'100%',
		height:'150px'
	};

	return (
		<React.Fragment>
			<PreLoader isLoading={isLoading}/>
			<section
			    data-testid="profile"
				id="profile"
				className="section overflow-hidden"
			>
				<div className='watchlist-container d-flex justify-content-center' style={myStyle1} >
					<div className='container d-flex justify-content-center' style={{marginBottom: '100px'}}>
						<div className='p-5 rounded-lg w-75 profile-shadow ' style={myStyle2}>
							<div className='mb-4 text-black-100 '>
								<h2 >Personal Details</h2>
								<hr/>

								<div className='row'>
									<div className='col-md-6'>
										<img
										// className="welcome-animation d-block"
											src="assets/img/profile2.png"
											alt=""
											style={pp}
										/>

									</div>
									<div className='col-md-6'>
										<div className='row mt-4 p-1 bg-grey' style={myStyle2} >
											<div className='col-4 text-left'>
												<div> First Name </div>
											</div>
											<div className='col-8 text-left'>
												<div>: {user?.first_name} </div>
											</div>
										</div>
										<div className='row p-1'>
											<div className='col-4 text-left'>
												<div> Last Name </div>
											</div>
											<div className='col-8 text-left'>
												<div>: {user?.last_name} </div>
											</div>
										</div>
										<div className='row p-1 bg-grey'>
											<div className='col-4 text-left'>
												<div> Email </div>
											</div>
											<div className='col-8 text-left'>
												<div>: {user?.email} </div>
											</div>
										</div>
										
									</div>

								</div>
								
							</div>
							<div className='row mt-5'>
								<div className='col-md-6'>
									<h3 className='text-left '>Watchlist</h3>
									<hr/>
									<Table data-testid='watchlist-table' className='font-weight-bolder text-left ml-2'>
										<thead>
											<th>
												Symbol
											</th>
										</thead>
										<tbody>
											{watchList.slice(0,3).map((item) => {
												return (
													<tr key={item.id}><td>{item.symbol}</td></tr>
												);
											})}
										</tbody>

									</Table>
									{/*<div className='h6 text-left pb-2'>You can add your favourite symbols into watchlist.</div>*/}
									<Link to='/profile/watchlist'>
										<div className='font-weight-bold h6 bg-color-3 rounded p-2 cursor-1 w-50'>See
											More...
										</div>
									</Link>
								</div>
								<div className='col-md-6'>
									<h3 className='text-left '>Price Alerts</h3>
									<hr/>
									<Table data-testid='alert-table' className='font-weight-bolder text-left'>
										<thead>
											<th>
											Symbol
											</th>
											<th>
												Alert Price
											</th>
										</thead>
										<tbody>
											{alerts.slice(0,3).map((item) => (
												<tr key={item.id}>
													<td>{item.symbol}</td>
													<td>{item.trigger_price}</td>
												</tr>

											))}
										</tbody>

									</Table>
									{/*<div className='h6 text-left pb-2'>You can add price alerts for any symbol</div>*/}
									<Link to={'/profile/alerts'}>
										<div className='font-weight-bold h6 bg-color-3 rounded p-2 cursor-1 w-50'>See
											More...
										</div>
									</Link>
								</div>
							</div>
						</div>

					</div>
				</div>
			</section>

		</React.Fragment>
	);
};

export default Profile;