import React, {Fragment} from 'react';

const PreLoader = () => {
	return(
		<Fragment>
			<div id="preloader">
				{/* Digimax Preloader */}
				<div id="digimax-preloader" className="digimax-preloader">
					{/* Preloader Animation */}
					<div className="preloader-animation">
						{/* Spinner */}
						<div className="spinner" />
						{/* Loader */}
						<div className="loader">
							<span data-text-preloader="D" className="animated-letters">
            D
							</span>
							<span data-text-preloader="I" className="animated-letters">
            I
							</span>
							<span data-text-preloader="G" className="animated-letters">
            G
							</span>
							<span data-text-preloader="I" className="animated-letters">
            I
							</span>
							<span data-text-preloader="M" className="animated-letters">
            M
							</span>
							<span data-text-preloader="A" className="animated-letters">
            A
							</span>
							<span data-text-preloader="X" className="animated-letters">
            X
							</span>
						</div>
						<p className="fw-5 text-center text-uppercase">Loading</p>
					</div>
					{/* Loader Animation */}
					<div className="loader-animation">
						<div className="row h-100">
							{/* Single Loader */}
							<div className="col-3 single-loader p-0">
								<div className="loader-bg" />
							</div>
							{/* Single Loader */}
							<div className="col-3 single-loader p-0">
								<div className="loader-bg" />
							</div>
							{/* Single Loader */}
							<div className="col-3 single-loader p-0">
								<div className="loader-bg" />
							</div>
							{/* Single Loader */}
							<div className="col-3 single-loader p-0">
								<div className="loader-bg" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};