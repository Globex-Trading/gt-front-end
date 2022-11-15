import React, { useEffect } from 'react';
import PreLoader from '../common/loader';
import { Link } from 'react-router-dom';
import { StoreContext } from '../common/stateProvider';

const Home = () => {
	const [isLoading, setIsLoading] = React.useState(true);

	useEffect(() => {
		setInterval(() => {
			setIsLoading(false);
		}, 500);
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
									<Link
										to="/register"
										className="btn btn-bordered-white d-none d-sm-inline-block font-weight-bold"
									>
                    Register
									</Link>
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
								{/*<span className="welcome-thumb-2">*/}
								{/*	<img*/}
								{/*		className="welcome-animation d-block"*/}
								{/*		src="assets/img/welcome/thumb_2.png"*/}
								{/*		alt=""*/}
								{/*	/>*/}
								{/*</span>*/}
								{/*<span className="welcome-thumb-3">*/}
								{/*	<img*/}
								{/*		className="welcome-animation d-block"*/}
								{/*		src="assets/img/welcome/thumb_3.png"*/}
								{/*		alt=""*/}
								{/*	/>*/}
								{/*</span>*/}
								{/*<span className="welcome-thumb-4">*/}
								{/*	<img*/}
								{/*		className="welcome-animation d-block"*/}
								{/*		src="assets/img/welcome/thumb_4.png"*/}
								{/*		alt=""*/}
								{/*	/>*/}
								{/*</span>*/}
								{/*<span className="welcome-thumb-5">*/}
								{/*	<img*/}
								{/*		className="welcome-animation d-block"*/}
								{/*		src="assets/img/welcome/thumb_5.png"*/}
								{/*		alt=""*/}
								{/*	/>*/}
								{/*</span>*/}
								{/*<span className="welcome-thumb-6">*/}
								{/*	<img*/}
								{/*		className="welcome-animation d-block"*/}
								{/*		src="assets/img/welcome/thumb_6.png"*/}
								{/*		alt=""*/}
								{/*	/>*/}
								{/*</span>*/}
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

			{/* ***** Promo Area End ***** */}
			{/* ***** Content Area Start ***** */}

			{/*		<section className="section content-area bg-grey ptb_150">*/}
			{/*			/!* Shape Top *!/*/}
			{/*			<div className="shape shape-top">*/}
			{/*				<svg*/}
			{/*					xmlns="http://www.w3.org/2000/svg"*/}
			{/*					viewBox="0 0 1000 100"*/}
			{/*					preserveAspectRatio="none"*/}
			{/*					fill="#FFFFFF"*/}
			{/*				>*/}
			{/*					<path*/}
			{/*						className="shape-fill"*/}
			{/*						d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7*/}
			{/*        c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4*/}
			{/*        c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"*/}
			{/*					/>*/}
			{/*				</svg>*/}
			{/*			</div>*/}
			{/*			<div className="container">*/}
			{/*				<div className="row justify-content-between">*/}
			{/*					<div className="col-12 col-lg-6">*/}
			{/*						/!* Content Inner *!/*/}
			{/*						<div className="content-inner text-center">*/}
			{/*							/!* Section Heading *!/*/}
			{/*							<div className="section-heading text-center mb-3">*/}
			{/*								<h2>We help to grow your business.</h2>*/}
			{/*								<p className="d-none d-sm-block mt-4">*/}
			{/*                                              Lorem ipsum dolor sit amet, consectetur adipisicing elit.*/}
			{/*                                              Laborum obcaecati dignissimos quae quo ad iste ipsum officiis*/}
			{/*                                              deleniti asperiores sit.*/}
			{/*								</p>*/}
			{/*								<p className="d-block d-sm-none mt-4">*/}
			{/*                                              Lorem ipsum dolor sit amet, consectetur adipisicing elit.*/}
			{/*                                              Laborum obcaecati.*/}
			{/*								</p>*/}
			{/*							</div>*/}
			{/*							/!* Content List *!/*/}
			{/*							<ul className="content-list text-left">*/}
			{/*								/!* Single Content List *!/*/}
			{/*								<li className="single-content-list media py-2">*/}
			{/*									<div className="content-icon pr-4">*/}
			{/*										<span className="color-1">*/}
			{/*											<i className="fas fa-angle-double-right" />*/}
			{/*										</span>*/}
			{/*									</div>*/}
			{/*									<div className="content-text media-body">*/}
			{/*										<span>*/}
			{/*											<b>Online Presence</b>*/}
			{/*											<br />*/}
			{/*                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.*/}
			{/*                    Veritatis, distinctio.*/}
			{/*										</span>*/}
			{/*									</div>*/}
			{/*								</li>*/}
			{/*								/!* Single Content List *!/*/}
			{/*								<li className="single-content-list media py-2">*/}
			{/*									<div className="content-icon pr-4">*/}
			{/*										<span className="color-1">*/}
			{/*											<i className="fas fa-angle-double-right" />*/}
			{/*										</span>*/}
			{/*									</div>*/}
			{/*									<div className="content-text media-body">*/}
			{/*										<span>*/}
			{/*											<b>Marketing Stretagy</b>*/}
			{/*											<br />*/}
			{/*                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.*/}
			{/*                    Veritatis, distinctio.*/}
			{/*										</span>*/}
			{/*									</div>*/}
			{/*								</li>*/}
			{/*								/!* Single Content List *!/*/}
			{/*								<li className="single-content-list media py-2">*/}
			{/*									<div className="content-icon pr-4">*/}
			{/*										<span className="color-1">*/}
			{/*											<i className="fas fa-angle-double-right" />*/}
			{/*										</span>*/}
			{/*									</div>*/}
			{/*									<div className="content-text media-body">*/}
			{/*										<span>*/}
			{/*											<b>Promote Local Sales</b>*/}
			{/*											<br />*/}
			{/*                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.*/}
			{/*                    Veritatis, distinctio.*/}
			{/*										</span>*/}
			{/*									</div>*/}
			{/*								</li>*/}
			{/*							</ul>*/}
			{/*							<a href="#" className="btn btn-bordered mt-4">*/}
			{/*                                          Learn More*/}
			{/*							</a>*/}
			{/*						</div>*/}
			{/*					</div>*/}
			{/*					<div className="col-12 col-lg-6">*/}
			{/*						/!* Service Thumb *!/*/}
			{/*						<div className="service-thumb mx-auto pt-4 pt-lg-0">*/}
			{/*							<img src="assets/img/content/content_thumb.png" alt="" />*/}
			{/*						</div>*/}
			{/*					</div>*/}
			{/*				</div>*/}
			{/*			</div>*/}
			{/*			/!* Shape Bottom *!/*/}
			{/*			<div className="shape shape-bottom">*/}
			{/*				<svg*/}
			{/*					xmlns="http://www.w3.org/2000/svg"*/}
			{/*					viewBox="0 0 1000 100"*/}
			{/*					preserveAspectRatio="none"*/}
			{/*					fill="#FFFFFF"*/}
			{/*				>*/}
			{/*					<path*/}
			{/*						className="shape-fill"*/}
			{/*						d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7*/}
			{/*c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4*/}
			{/*c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"*/}
			{/*					/>*/}
			{/*				</svg>*/}
			{/*			</div>*/}
			{/*		</section>*/}

			{/* ***** Content Area End ***** */}
			{/* ***** Content Area Start ***** */}

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
												src="assets/img/crypto-icons/btc.png"
											/>
										</span>
										<span className="profile-icon icon-2">
											<img
												className="icon-2-img"
												src="assets/img/crypto-icons/eth.png"
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
								{/*<img*/}
								{/*	className="folder-img"*/}
								{/*	src="assets/img/back1_.jpg"*/}
								{/*/>*/}
							</div>
						</div>
						<div className="col-12 col-lg-6">
							{/* Content Inner */}
							<div className="content-inner text-center pt-sm-4 pt-lg-0 mt-sm-5 mt-lg-0">
								{/* Section Heading */}
								<div className="section-heading text-center mb-3">
									<div className='h1 font-weight-bolder'>
										About Us
									</div>
									<p className="d-none d-sm-block mt-4">
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
												<b> Visualising Trading Data</b>
												<br />
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
												<b>Technical Indicators</b>
												<br />
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
												<b>Price Alerts</b>
												<br />
											</span>
										</div>
									</li>
								</ul>
								{/*						<a href="#" className="btn btn-bordered mt-4">*/}
								{/*Learn More*/}
								{/*						</a>*/}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ***** Content Area End ***** */}
			{/* ***** Service Area End ***** */}

			{/*		<section id="service" className="section service-area bg-grey ptb_150">*/}
			{/*			/!* Shape Top *!/*/}
			{/*			<div className="shape shape-top">*/}
			{/*				<svg*/}
			{/*					xmlns="http://www.w3.org/2000/svg"*/}
			{/*					viewBox="0 0 1000 100"*/}
			{/*					preserveAspectRatio="none"*/}
			{/*					fill="#FFFFFF"*/}
			{/*				>*/}
			{/*					<path*/}
			{/*						className="shape-fill"*/}
			{/*						d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7*/}
			{/*        c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4*/}
			{/*        c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"*/}
			{/*					/>*/}
			{/*				</svg>*/}
			{/*			</div>*/}
			{/*			<div className="container">*/}
			{/*				<div className="row justify-content-center">*/}
			{/*					<div className="col-12 col-md-10 col-lg-7">*/}
			{/*						/!* Section Heading *!/*/}
			{/*						<div className="section-heading text-center">*/}
			{/*							<h2>We provide the best digital services</h2>*/}
			{/*							<p className="d-none d-sm-block mt-4">*/}
			{/*                                          Lorem ipsum dolor sit amet, consectetur adipisicing elit.*/}
			{/*                                          Laborum obcaecati dignissimos quae quo ad iste ipsum officiis*/}
			{/*                                          deleniti asperiores sit.*/}
			{/*							</p>*/}
			{/*							<p className="d-block d-sm-none mt-4">*/}
			{/*                                          Lorem ipsum dolor sit amet, consectetur adipisicing elit.*/}
			{/*                                          Laborum obcaecati.*/}
			{/*							</p>*/}
			{/*						</div>*/}
			{/*					</div>*/}
			{/*				</div>*/}
			{/*				<div className="row">*/}
			{/*					<div className="col-12 col-md-6 col-lg-4">*/}
			{/*						/!* Single Service *!/*/}
			{/*						<div className="single-service p-4">*/}
			{/*							<span className="flaticon-rocket-launch color-1 icon-bg-1" />*/}
			{/*							<h3 className="my-3">Data Analytics</h3>*/}
			{/*							<p>*/}
			{/*                                          Lorem ipsum dolor sit amet, consectet ur adipisicing elit, sed*/}
			{/*                                          do eiusmod tempor incididunt emit.*/}
			{/*							</p>*/}
			{/*							<a className="service-btn mt-3" href="#">*/}
			{/*                                          Learn More*/}
			{/*							</a>*/}
			{/*						</div>*/}
			{/*					</div>*/}
			{/*					<div className="col-12 col-md-6 col-lg-4">*/}
			{/*						/!* Single Service *!/*/}
			{/*						<div className="single-service p-4">*/}
			{/*							<span className="flaticon-monitoring color-2 icon-bg-2" />*/}
			{/*							<h3 className="my-3">Website Growth</h3>*/}
			{/*							<p>*/}
			{/*                                          Lorem ipsum dolor sit amet, consectet ur adipisicing elit, sed*/}
			{/*                                          do eiusmod tempor incididunt emit.*/}
			{/*							</p>*/}
			{/*							<a className="service-btn mt-3" href="#">*/}
			{/*                                          Learn More*/}
			{/*							</a>*/}
			{/*						</div>*/}
			{/*					</div>*/}
			{/*					<div className="col-12 col-md-6 col-lg-4">*/}
			{/*						/!* Single Service *!/*/}
			{/*						<div className="single-service p-4">*/}
			{/*							<span className="flaticon-web color-3 icon-bg-3" />*/}
			{/*							<h3 className="my-3">Seo Ranking</h3>*/}
			{/*							<p>*/}
			{/*                                          Lorem ipsum dolor sit amet, consectet ur adipisicing elit, sed*/}
			{/*                                          do eiusmod tempor incididunt emit.*/}
			{/*							</p>*/}
			{/*							<a className="service-btn mt-3" href="#">*/}
			{/*                                          Learn More*/}
			{/*							</a>*/}
			{/*						</div>*/}
			{/*					</div>*/}
			{/*					<div className="col-12 col-md-6 col-lg-4">*/}
			{/*						/!* Single Service *!/*/}
			{/*						<div className="single-service p-4">*/}
			{/*							<span className="flaticon-smartphone color-4 icon-bg-4" />*/}
			{/*							<h3 className="my-3">App Development</h3>*/}
			{/*							<p>*/}
			{/*                                          Lorem ipsum dolor sit amet, consectet ur adipisicing elit, sed*/}
			{/*                                          do eiusmod tempor incididunt emit.*/}
			{/*							</p>*/}
			{/*							<a className="service-btn mt-3" href="#">*/}
			{/*                                          Learn More*/}
			{/*							</a>*/}
			{/*						</div>*/}
			{/*					</div>*/}
			{/*					<div className="col-12 col-md-6 col-lg-4">*/}
			{/*						/!* Single Service *!/*/}
			{/*						<div className="single-service p-4">*/}
			{/*							<span className="flaticon-email color-5 icon-bg-5" />*/}
			{/*							<h3 className="my-3">Email Marketing</h3>*/}
			{/*							<p>*/}
			{/*                                          Lorem ipsum dolor sit amet, consectet ur adipisicing elit, sed*/}
			{/*                                          do eiusmod tempor incididunt emit.*/}
			{/*							</p>*/}
			{/*							<a className="service-btn mt-3" href="#">*/}
			{/*                                          Learn More*/}
			{/*							</a>*/}
			{/*						</div>*/}
			{/*					</div>*/}
			{/*					<div className="col-12 col-md-6 col-lg-4">*/}
			{/*						/!* Single Service *!/*/}
			{/*						<div className="single-service p-4">*/}
			{/*							<span className="flaticon-affiliate color-6 icon-bg-6" />*/}
			{/*							<h3 className="my-3">Affiliate Marketing</h3>*/}
			{/*							<p>*/}
			{/*                                          Lorem ipsum dolor sit amet, consectet ur adipisicing elit, sed*/}
			{/*                                          do eiusmod tempor incididunt emit.*/}
			{/*							</p>*/}
			{/*							<a className="service-btn mt-3" href="#">*/}
			{/*                                          Learn More*/}
			{/*							</a>*/}
			{/*						</div>*/}
			{/*					</div>*/}
			{/*				</div>*/}
			{/*			</div>*/}
			{/*			/!* Shape Bottom *!/*/}
			{/*			<div className="shape shape-bottom">*/}
			{/*				<svg*/}
			{/*					xmlns="http://www.w3.org/2000/svg"*/}
			{/*					viewBox="0 0 1000 100"*/}
			{/*					preserveAspectRatio="none"*/}
			{/*					fill="#FFFFFF"*/}
			{/*				>*/}
			{/*					<path*/}
			{/*						className="shape-fill"*/}
			{/*						d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7*/}
			{/*c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4*/}
			{/*c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"*/}
			{/*					/>*/}
			{/*				</svg>*/}
			{/*			</div>*/}
			{/*		</section>*/}

			{/* ***** Service Area End ***** */}
			{/*====== Contact Area Start ======*/}

			{/*<section id="contact" className="contact-area ptb_100">*/}
			{/*	<div className="container">*/}
			{/*		<div className="row justify-content-between align-items-center">*/}
			{/*			<div className="col-12 col-lg-5">*/}
			{/*				/!* Section Heading *!/*/}
			{/*				<div className="section-heading text-center mb-3">*/}
			{/*					<h2>Lets connect!</h2>*/}
			{/*					<p className="d-none d-sm-block mt-4">*/}
			{/*                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.*/}
			{/*                                Laborum obcaecati dignissimos quae quo ad iste ipsum officiis*/}
			{/*                                deleniti asperiores sit.*/}
			{/*					</p>*/}
			{/*					<p className="d-block d-sm-none mt-4">*/}
			{/*                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.*/}
			{/*                                Laborum obcaecati.*/}
			{/*					</p>*/}
			{/*				</div>*/}
			{/*				/!* Contact Us *!/*/}
			{/*				<div className="contact-us">*/}
			{/*					<ul>*/}
			{/*						/!* Contact Info *!/*/}
			{/*						<li className="contact-info color-1 bg-hover active hover-bottom text-center p-5 m-3">*/}
			{/*							<span>*/}
			{/*								<i className="fas fa-mobile-alt fa-3x" />*/}
			{/*							</span>*/}
			{/*							<a className="d-block my-2" href="#">*/}
			{/*								<h3>+89 (0) 2354 5470091</h3>*/}
			{/*							</a>*/}
			{/*							<p>*/}
			{/*                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.*/}
			{/*							</p>*/}
			{/*						</li>*/}
			{/*						/!* Contact Info *!/*/}
			{/*						<li className="contact-info color-3 bg-hover active hover-bottom text-center p-5 m-3">*/}
			{/*							<span>*/}
			{/*								<i className="fas fa-envelope-open-text fa-3x" />*/}
			{/*							</span>*/}
			{/*							<a className="d-none d-sm-block my-2" href="#">*/}
			{/*								<h3>mail@company.com</h3>*/}
			{/*							</a>*/}
			{/*							<a className="d-block d-sm-none my-2" href="#">*/}
			{/*								<h3>mail@your company.com</h3>*/}
			{/*							</a>*/}
			{/*							<p>*/}
			{/*                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.*/}
			{/*							</p>*/}
			{/*						</li>*/}
			{/*					</ul>*/}
			{/*				</div>*/}
			{/*			</div>*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*</section>*/}

			{/*====== Contact Area End ======*/}
			{/*====== Call To Action Area Start ======*/}

			{/*<section className="section cta-area bg-overlay ptb_100">*/}
			{/*	<div className="container">*/}
			{/*		<div className="row justify-content-center">*/}
			{/*			<div className="col-12 col-lg-10">*/}
			{/*				/!* Section Heading *!/*/}
			{/*				<div className="section-heading text-center m-0">*/}
			{/*					<h2 className="text-white">*/}
			{/*                                Looking for the best digital agency &amp; marketing solution?*/}
			{/*					</h2>*/}
			{/*					<p className="text-white d-none d-sm-block mt-4">*/}
			{/*                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.*/}
			{/*                                Laborum obcaecati dignissimos quae quo ad iste ipsum officiis*/}
			{/*                                deleniti asperiores sit.*/}
			{/*					</p>*/}
			{/*					<p className="text-white d-block d-sm-none mt-4">*/}
			{/*                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.*/}
			{/*                                Laborum obcaecati.*/}
			{/*					</p>*/}
			{/*					<a href="#" className="btn btn-bordered-white mt-4">*/}
			{/*                                Contact Us*/}
			{/*					</a>*/}
			{/*				</div>*/}
			{/*			</div>*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*</section>*/}

			{/*====== Call To Action Area End ======*/}
			{/*====== Footer Area Start ======*/}

			<footer className="section footer-area">
				{/* Footer Top */}
				{/*<div className="footer-top ptb_100">*/}
				{/*	<div className="container">*/}
				{/*		<div className="row">*/}
				{/*			<div className="col-12 col-sm-6 col-lg-3">*/}
				{/*				/!* Footer Items *!/*/}
				{/*				<div className="footer-items">*/}
				{/*					/!* Footer Title *!/*/}
				{/*					<h3 className="footer-title text-uppercase mb-2">About Us</h3>*/}
				{/*					<ul>*/}
				{/*						<li className="py-2">*/}
				{/*							<a className="text-black-50" href="#">*/}
				{/*                                        Company Profile*/}
				{/*							</a>*/}
				{/*						</li>*/}
				{/*						<li className="py-2">*/}
				{/*							<a className="text-black-50" href="#">*/}
				{/*                                        Testimonials*/}
				{/*							</a>*/}
				{/*						</li>*/}
				{/*						<li className="py-2">*/}
				{/*							<a className="text-black-50" href="#">*/}
				{/*                                        Careers*/}
				{/*							</a>*/}
				{/*						</li>*/}
				{/*						<li className="py-2">*/}
				{/*							<a className="text-black-50" href="#">*/}
				{/*                                        Partners*/}
				{/*							</a>*/}
				{/*						</li>*/}
				{/*						<li className="py-2">*/}
				{/*							<a className="text-black-50" href="#">*/}
				{/*                                        Affiliate Program*/}
				{/*							</a>*/}
				{/*						</li>*/}
				{/*					</ul>*/}
				{/*				</div>*/}
				{/*			</div>*/}
				{/*			<div className="col-12 col-sm-6 col-lg-3">*/}
				{/*				/!* Footer Items *!/*/}
				{/*				<div className="footer-items">*/}
				{/*					/!* Footer Title *!/*/}
				{/*					<h3 className="footer-title text-uppercase mb-2">Services</h3>*/}
				{/*					<ul>*/}
				{/*						<li className="py-2">*/}
				{/*							<a className="text-black-50" href="#">*/}
				{/*                                        Web Application*/}
				{/*							</a>*/}
				{/*						</li>*/}
				{/*						<li className="py-2">*/}
				{/*							<a className="text-black-50" href="#">*/}
				{/*                                        Product Management*/}
				{/*							</a>*/}
				{/*						</li>*/}
				{/*						<li className="py-2">*/}
				{/*							<a className="text-black-50" href="#">*/}
				{/*                                        User Interaction Design*/}
				{/*							</a>*/}
				{/*						</li>*/}
				{/*						<li className="py-2">*/}
				{/*							<a className="text-black-50" href="#">*/}
				{/*                                        UX Consultant*/}
				{/*							</a>*/}
				{/*						</li>*/}
				{/*						<li className="py-2">*/}
				{/*							<a className="text-black-50" href="#">*/}
				{/*                                        Social Media Marketing*/}
				{/*							</a>*/}
				{/*						</li>*/}
				{/*					</ul>*/}
				{/*				</div>*/}
				{/*			</div>*/}
				{/*			<div className="col-12 col-sm-6 col-lg-3">*/}
				{/*				/!* Footer Items *!/*/}
				{/*				<div className="footer-items">*/}
				{/*					/!* Footer Title *!/*/}
				{/*					<h3 className="footer-title text-uppercase mb-2">Support</h3>*/}
				{/*					<ul>*/}
				{/*						<li className="py-2">*/}
				{/*							<a className="text-black-50" href="#">*/}
				{/*                                        Frequently Asked*/}
				{/*							</a>*/}
				{/*						</li>*/}
				{/*						<li className="py-2">*/}
				{/*							<a className="text-black-50" href="#">*/}
				{/*                                        Terms &amp; Conditions*/}
				{/*							</a>*/}
				{/*						</li>*/}
				{/*						<li className="py-2">*/}
				{/*							<a className="text-black-50" href="#">*/}
				{/*                                        Privacy Policy*/}
				{/*							</a>*/}
				{/*						</li>*/}
				{/*						<li className="py-2">*/}
				{/*							<a className="text-black-50" href="#">*/}
				{/*                                        Help Center*/}
				{/*							</a>*/}
				{/*						</li>*/}
				{/*						<li className="py-2">*/}
				{/*							<a className="text-black-50" href="#">*/}
				{/*                                        Contact Us*/}
				{/*							</a>*/}
				{/*						</li>*/}
				{/*					</ul>*/}
				{/*				</div>*/}
				{/*			</div>*/}
				{/*			<div className="col-12 col-sm-6 col-lg-3">*/}
				{/*				/!* Footer Items *!/*/}
				{/*				<div className="footer-items">*/}
				{/*					/!* Footer Title *!/*/}
				{/*					<h3 className="footer-title text-uppercase mb-2">Follow Us</h3>*/}
				{/*					<p className="mb-2">*/}
				{/*                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.*/}
				{/*                                Tenetur, quae.*/}
				{/*					</p>*/}
				{/*					/!* Social Icons *!/*/}
				{/*					<ul className="social-icons list-inline pt-2">*/}
				{/*						<li className="list-inline-item px-1">*/}
				{/*							<a href="#">*/}
				{/*								<i className="fab fa-facebook" />*/}
				{/*							</a>*/}
				{/*						</li>*/}
				{/*						<li className="list-inline-item px-1">*/}
				{/*							<a href="#">*/}
				{/*								<i className="fab fa-twitter" />*/}
				{/*							</a>*/}
				{/*						</li>*/}
				{/*						<li className="list-inline-item px-1">*/}
				{/*							<a href="#">*/}
				{/*								<i className="fab fa-google-plus" />*/}
				{/*							</a>*/}
				{/*						</li>*/}
				{/*						<li className="list-inline-item px-1">*/}
				{/*							<a href="#">*/}
				{/*								<i className="fab fa-linkedin-in" />*/}
				{/*							</a>*/}
				{/*						</li>*/}
				{/*						<li className="list-inline-item px-1">*/}
				{/*							<a href="#">*/}
				{/*								<i className="fab fa-instagram" />*/}
				{/*							</a>*/}
				{/*						</li>*/}
				{/*					</ul>*/}
				{/*				</div>*/}
				{/*			</div>*/}
				{/*		</div>*/}
				{/*	</div>*/}
				{/*</div>*/}
				{/* Footer Bottom */}
				<div className="footer-bottom bg-grey">
					<div className="container">
						<div className="row">
							<div className="col-12">
								{/* Copyright Area */}
								<div className="copyright-area d-flex flex-wrap justify-content-center justify-content-sm-between text-center py-4">
									{/* Copyright Left */}
									<div className="copyright-left font-weight-bold">
                    © Copyrights 2022 Globex Trading All rights reserved.
									</div>
									{/* Copyright Right */}
									{/*<div className="copyright-right">*/}
									{/*            Made with <i className="fas fa-heart" /> By*/}
									{/*	<a href="#">Globex Trading</a>*/}
									{/*</div>*/}
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>
			{/*====== Footer Area End ======*/}
			{/*====== Modal Search Area Start ======*/}
			<div id="search" className="modal fade p-0">
				<div className="modal-dialog dialog-animated">
					<div className="modal-content h-100">
						<div className="modal-header" data-dismiss="modal">
              Search <i className="far fa-times-circle icon-close" />
						</div>
						<div className="modal-body">
							<form className="row">
								<div className="col-12 align-self-center">
									<div className="row">
										<div className="col-12 pb-3">
											<h2 className="search-title mb-3">
                        What are you looking for?
											</h2>
											<p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Praesent diam lacus, dapibus sed imperdiet consectetur.
											</p>
										</div>
									</div>
									<div className="row">
										<div className="col-12 input-group">
											<input
												type="text"
												className="form-control"
												placeholder="Enter your keywords"
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-12 input-group align-self-center">
											<button className="btn btn-bordered mt-3">Search</button>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			{/*====== Modal Search Area End ======*/}
			{/*====== Modal Responsive Menu Area Start ======*/}
			<div id="menu" className="modal fade p-0">
				<div className="modal-dialog dialog-animated">
					<div className="modal-content h-100">
						<div className="modal-header" data-dismiss="modal">
              Menu <i className="far fa-times-circle icon-close" />
						</div>
						<div className="menu modal-body">
							<div className="row w-100">
								<div className="items p-0 col-12 text-center" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Home;
