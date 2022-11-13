import React, {Fragment} from 'react';

const Page404 = () => {
	return (
		<Fragment>
			<section
				data-testid={'page404'}
				id="login"
				className="section welcome-area login-styles overflow-hidden d-flex align-items-center"
				style={{backgroundImage: 'url("assets/img/back3.webp")'}}
			>
				<div className="container">
					<h1 className="text-white">404</h1>
					<p className="text-white">Page not found</p>
				</div>
			</section>
		</Fragment>
	);
};

export default Page404;