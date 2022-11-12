import React, {useEffect, useState} from 'react';
import {getUser} from '../../services/authService';
import PreLoader from '../common/loader';
// import bi from 'assets/img/welcome/welcome1.png';

const Profile = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState({});

	useEffect(() => {
		setIsLoading(true);
		getUserDetails();
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);

	}, []);

	const getUserDetails = async () => {
		const response = await getUser();
		console.log(response);
		//TODO: set user details
	};

	const myStyle1={
		backgroundImage: 'url(assets/img/white-bg.jpg)',
		backgroundSize: 'cover',
		height: '100vh',
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
				id="watchlist"
				className="section overflow-hidden"
				style={{backgroundImage: 'url("assets/img/back3.webp")'}}
			>
				<div className='watchlist-container d-flex justify-content-center' style={myStyle1} >
					<div className='container d-flex justify-content-center'>
						<div className='mt-5 p-5 rounded-lg w-75 profile-shadow ' style={myStyle2}>
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
												<div>: Dasun </div>
											</div>
										</div>
										<div className='row p-1'>
											<div className='col-4 text-left'>
												<div> Last Name </div>
											</div>
											<div className='col-8 text-left'>
												<div>: Nimantha </div>
											</div>
										</div>
										<div className='row p-1 bg-grey'>
											<div className='col-4 text-left'>
												<div> Email </div>
											</div>
											<div className='col-8 text-left'>
												<div>: hgdnimantha@gmail.com </div>
											</div>
										</div>
										
									</div>

								</div>
								
							</div>
							<div className='row mt-5'>
								<div className='col-md-6'>
									<h3 className='text-left '>Watchlist</h3>
									<hr/>
									<div className='h6 text-left pb-2'>You can add your favourite symbols into watchlist.</div>
									<div className='font-weight-bold h6 bg-color-3 rounded p-2 cursor-1 w-50'>See More <i className='fa-external-link-square-alt'/> </div>
								</div>
								<div className='col-md-6'>
									<h3 className='text-left '>Price Alerts</h3>
									<hr/>
									<div className='h6 text-left pb-2'>You can add price alerts for any symbol</div>
									<div className='font-weight-bold h6 bg-color-3 rounded p-2 cursor-1 w-50'>See More <i className='fa-external-link-square-alt'/> </div>
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