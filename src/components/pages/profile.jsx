import React, {useEffect, useState} from 'react';
import {getUser} from '../../services/authService';
import PreLoader from '../common/loader';

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

	return (
		<React.Fragment>
			<PreLoader isLoading={isLoading}/>
			<section
				id="watchlist"
				className="section bg-overlay overflow-hidden"
			>
				<div className='watchlist-container d-flex justify-content-center'>
					<div className='container d-flex justify-content-center'>
						<div className='my-5 p-5 rounded-lg w-75 shadow-lg '>
							<div className='mb-4 text-black-100 font-italic'>
								<h2 className='text-left'>Personal Details</h2>
								<hr/>
								<div className='row p-1 bg-grey' >
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
							<div className='row'>
								<div className='col-md-6'>
									<h3 className='text-left font-italic'>Watchlist</h3>
									<hr/>
									<div className='h6 font-italic text-left pb-2'>You can add your favourite symbols into watchlist.</div>
									<div className='font-weight-bold h6 bg-color-3 rounded p-2 cursor-1 w-50'>See More <i className='fa-external-link-square-alt'/> </div>
								</div>
								<div className='col-md-6'>
									<h3 className='text-left font-italic'>Price Alerts</h3>
									<hr/>
									<div className='h6 font-italic text-left pb-2'>You can add price alerts for any symbol</div>
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