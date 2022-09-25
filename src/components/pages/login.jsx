import React, {useEffect} from 'react';
import PreLoader from '../common/loader';
import {Link} from 'react-router-dom';

const Login = () => {
	const [isLoading, setIsLoading] = React.useState(true);

	useEffect(() => {

		setInterval(() => {
			setIsLoading(false);
		}, 3000);
	});
	return (
		<div>
			<PreLoader isLoading={isLoading} />
			<section
				id="home"
				className="section welcome-area bg-overlay overflow-hidden d-flex align-items-center"
			>
				<div className="container logincontainer">
					<div className="card bg-glass" style={{borderRadius: '3%'}}>
						<div className="card-body px-4 py-5 px-md-5">
							<form>
								<h2 className="fw-bold mb-2 text-uppercase" style={{textAlign: 'center'}}>Login</h2>
								<div className="form-outline mb-2">
									<input type="email" id="form3Example3" className="form-control border "/>
									<label className="form-label" htmlFor="form3Example3">Email address</label>
								</div>

								<div className="form-outline mb-2">
									<input type="password" id="form3Example4" className="form-control border "/>
									<label className="form-label" htmlFor="form3Example4">Password</label>
								</div>
								<Link to="/register" className="link-secondary text-danger">Need to create new account?</Link>


								<button type="submit" className="btn btn-primary btn-block mb-3 mt-1">
									Sign up
								</button>

								<div className="text-center">
									<p>or sign up with:</p>

									<button type="button" className="btn btn-link btn-floating mx-1">
										<i className="fab fa-google"/>
									</button>

								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Login;