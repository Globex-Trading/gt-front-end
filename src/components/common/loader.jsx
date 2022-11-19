import React, {Fragment} from 'react';

const PreLoader = (props) => {
	return(
		props.isLoading &&
		<Fragment>
			<div id="preloader" data-testid="preloader">
				{/*  Preloader */}
				<div id="digimax-preloader" className="digimax-preloader">
					{/* Preloader Animation */}
					<div className="preloader-animation">
						{/* Spinner */}
						<div className="spinner" />
						{/* Loader */}
						<div className="loader">
							<span data-text-preloader="G" className="animated-letters">
            G
							</span>
							<span data-text-preloader="L" className="animated-letters">
            L
							</span>
							<span data-text-preloader="O" className="animated-letters">
            O
							</span>
							<span data-text-preloader="B" className="animated-letters">
            B
							</span>
							<span data-text-preloader="E" className="animated-letters">
            E
							</span>
							<span data-text-preloader="X" className="animated-letters">
            X
							</span>

						</div>
						<p className="fw-5 text-center text-uppercase">TRADING</p>
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

export default PreLoader;