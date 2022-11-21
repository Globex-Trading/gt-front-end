import React, {useContext, useEffect} from 'react';
import PreLoader from '../common/loader';
import { Link } from 'react-router-dom';
import { StoreContext } from '../common/stateProvider';
import Footer from "../common/footer";

const Home = () => {

	const [isLoading, setIsLoading] = React.useState(true);
	const {user} = useContext(StoreContext);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	});
	return (
		<React.Fragment>
			<PreLoader isLoading={isLoading} />
			{/*====== Scroll To Top Area Start ======*/}
			<div id="scrollUp" title="Scroll To Top">
				<i className="fas fa-arrow-up" />
			</div>
			{/*====== Scroll To Top Area End ======*/}
			<section
				data-testid="home"
				id="home"
				className="section welcome-area overflow-hidden d-flex align-items-center"
				style={{backgroundImage: 'url(assets/img/back3.webp)', backgroundSize: 'cover', height: '100vh'}}
			>
				<div className="container">
					<div className="row align-items-center">
						{/* Welcome Intro Start */}
						<div className="col-12 col-md-7">
							<div className="welcome-intro text-left">
								<h1 className="text-white">
                  We Visualize. <br /> You Make{' '}
									<span className="color-3">Decisions</span>.
								</h1>
								<p className="text-white my-4">
                  Globex Trading is a market data exploration application that
                  helps traders to make their decisions on trading pairs. Globex
                  Trading make that easy with technical indicators and price
                  alerts.
								</p>
								{/* Buttons */}
								<div className="button-group">
									<Link
										to="/chart"
										className="btn btn-bordered-white font-weight-bold"
									>
                    Charts
									</Link>
									{!user && <Link
										to="/register"
										className="btn btn-bordered-white d-sm-inline-block font-weight-bold"
									>
										Register
									</Link>}
								</div>
							</div>
						</div>
						<div className="col-12 col-md-5">
							{/* Welcome Thumb */}
							<div className="welcome-thumb-wrapper mt-5 mt-md-0">
								<span className="welcome-thumb-1">
									<img
										className="welcome-animation d-block ml-auto"
										src="assets/img/welcome/welcome1.png"
										alt=""
									/>
								</span>
							</div>
						</div>
					</div>
				</div>
				{/* Shape Bottom */}
				<div className="shape shape-bottom">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 1000 100"
						preserveAspectRatio="none"
						fill="#FFFFFF"
					>
						<path
							className="shape-fill"
							d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7
  c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4
  c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"
						/>
					</svg>
				</div>
			</section>
			{/* ***** Welcome Area End ***** */}
			{/* ***** Promo Area Start ***** */}
			<section className="section promo-area ptb_50">
				<div className="container">
					<div className="row">
						<div className="col-12 col-md-6 col-lg-4 res-margin">
							{/* Single Promo */}
							<div className="single-promo color-1 bg-hover hover-bottom text-center p-5">
								<div className="mb-3 h1 font-weight-bold">
                  Visualize Trading Data
								</div>
								<p>
									<strong>Visualizing</strong> the data is the best way to
                  understand the data, and make decisions on the data. We
                  provide a variety of ways to visualize the trading data,
                  including candlestick charts, and line charts. As a trader you
                  can use these charts to make decisions on your trades. And it
                  will help you to understand the data better. Happy Trading!
								</p>
							</div>
						</div>
						<div className="col-12 col-md-6 col-lg-4 res-margin">
							{/* Single Promo */}
							<div className="single-promo color-2 bg-hover active hover-bottom text-center p-5">
								<div className="mb-3 h1 font-weight-bold">
                  Technical Indicators
								</div>
								<p>
                  Technical indicators are used by traders to gain insight into
                  the supply and demand of securities and market psychology.
                  Together, these indicators form the basis of technical
                  analysis. Metrics, such as trading volume, provide clues as to
                  whether a price move will continue. In this way, indicators
                  can be used to generate buy and sell signals.
								</p>
							</div>
						</div>
						<div className="col-12 col-md-6 col-lg-4">
							{/* Single Promo */}
							<div className="single-promo color-3 bg-hover hover-bottom text-center p-5">
								<div className="mb-3 h1 font-weight-bold">
                  Price <br />
                  Alerts
								</div>
								<p>
                  We provide the functionality to set price alerts for any
                  cryptocurrency trading data. Once you add a price alert it
                  checks with the actual price then notify using notification
                  you if the price is reached. This feature helps you to keep
                  touch in with the your trades and doing some another work
                  without any worry!. To use the feature you have to register
                  first.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="section content-area ptb_150">
				<div className="container">
					<div className="row justify-content-between">
						<div className="col-12 col-lg-6">
							{/* Profile Circle Wrapper */}
							<div className="profile-circle-wrapper circle-animation d-none d-sm-block">
								{/* Profile Inner */}
								<div className="profile-inner">
									{/* Profile Circle */}
									<div className="profile-circle circle-lg">
										<span className="profile-icon icon-1">
											<img
												className="icon-1-img"
												src="assets/img/crypto-icons/doge.png"
											/>
										</span>
										<span className="profile-icon icon-2">
											<img
												className="icon-2-img"
												src="assets/img/crypto-icons/avax.png"
											/>
										</span>
										<span className="profile-icon icon-3">
											<img
												className="icon-3-img"
												src="assets/img/crypto-icons/bnb.png"
											/>
										</span>
										<span className="profile-icon icon-4">
											<img
												className="icon-4-img"
												src="assets/img/crypto-icons/dot.png"
											/>
										</span>
									</div>
									{/* Profile Circle */}
									<div className="profile-circle circle-md">
										<span className="profile-icon icon-5">
											<img
												className="icon-5-img"
												src="assets/img/crypto-icons/matic.png"
											/>
										</span>
										<span className="profile-icon icon-6">
											<img
												className="icon-6-img"
												src="assets/img/crypto-icons/link.png"
											/>
										</span>
										<span className="profile-icon icon-7">
											<img
												className="icon-7-img"
												src="assets/img/crypto-icons/sol.png"
											/>
										</span>
									</div>
									{/* Profile Circle */}
									<div className="profile-circle circle-sm">
										<span className="profile-icon icon-8">
											<img
												className="icon-8-img"
												src="assets/img/crypto-icons/btc.png"
											/>
										</span>
										<span className="profile-icon icon-9">
											<img
												className="icon-9-img"
												src="assets/img/crypto-icons/eth.png"
											/>
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="col-12 col-lg-6">
							{/* Content Inner */}
							<div className="content-inner text-center pt-sm-4 pt-lg-0 mt-sm-5 mt-lg-0">
								{/* Section Heading */}
								<div className="section-heading text-center mb-3">
									<div className='h1 font-weight-bolder'>
										Features
									</div>
									<p className="d-sm-block mt-4 h5">
										This is a free visualization tool for people who are interested in Trading in both crypto
										currencies and stocks.
									</p>
								</div>
								{/* Content List */}
								<ul className="content-list text-left">
									{/* Single Content List */}
									<li className="single-content-list media py-2">
										<div className="content-icon pr-4">
											<span className="color-2">
												<i className="fas fa-angle-double-right" />
											</span>
										</div>
										<div className="content-text media-body">
											<span>
												<div className='h5'><b> Watchlist</b></div>
												<p>You can add your favorite trading pairs using our watchlist feature</p>
											</span>
										</div>
									</li>
									{/* Single Content List */}
									<li className="single-content-list media py-2">
										<div className="content-icon pr-4">
											<span className="color-2">
												<i className="fas fa-angle-double-right" />
											</span>
										</div>
										<div className="content-text media-body">
											<span>
												<div className='h5'><b> Technical Indicators</b></div>
												<p>We are providing 10+ indicators to analyze charts. There is no restriction to using multiple indicators</p>
											</span>
										</div>
									</li>
									{/* Single Content List */}
									<li className="single-content-list media py-2">
										<div className="content-icon pr-4">
											<span className="color-2">
												<i className="fas fa-angle-double-right" />
											</span>
										</div>
										<div className="content-text media-body">
											<span>
												<div className='h5'><b> Price Alerts</b></div>
												<p>You will never miss the price target again with our push notification feature</p>
											</span>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer/>
		</React.Fragment>
	);
};

export default Home;
