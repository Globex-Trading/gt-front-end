import React, { Fragment, useContext, useEffect } from 'react';
import AOS from 'aos';
import { Link } from 'react-router-dom';
import { StoreContext } from './stateProvider';
import 'material-icons/iconfont/material-icons.css';

AOS.init();

const Header = () => {
	const { state, setState } = useContext(StoreContext);
	let user = null;
	if (state) user = state.user;

	return (
		<Fragment>
			<header id="header" data-testid="hd">
				{/* Navbar */}
				<nav
					data-aos="zoom-out"
					data-aos-delay={800}
					className="navbar navbar-expand"
				>
					<div className="container header">
						{/* Navbar Brand*/}
						<Link className="navbar-brand p-2" to="/">
							<img
								className="navbar-brand-regular globex-logo"
								src={process.env.PUBLIC_URL + '/assets/img/logo/GLOBEX-1.png'}
								alt="brand-logo"
							/>
							<img
								className="navbar-brand-sticky globex-logo"
								src={
									process.env.PUBLIC_URL + '/assets/img/logo/GLOBEX-1-white.png'
								}
								alt="sticky brand-logo"
							/>
						</Link>
						<div className="ml-auto" />
						{/* Navbar */}

						<ul className="navbar-nav items">
							<li className="nav-item">
								<Link className="nav-link" to="/">
                  Home
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/">
                  About Us
								</Link>
							</li>
							{/*	<li className="nav-item dropdown">*/}
							{/*		<Link className="nav-link" to="/" onClick={() => updateComponent()}>*/}
							{/*            Home <i className="fas fa-angle-down ml-1" />*/}
							{/*		</Link>*/}
							{/*		<ul className="dropdown-menu">*/}
							{/*			<li className="nav-item dropdown">*/}
							{/*				<a className="nav-link" href="#">*/}
							{/*                    Multi-Page <i className="fas fa-angle-right ml-1" />*/}
							{/*				</a>*/}
							{/*				<ul className="dropdown-menu">*/}
							{/*					<li className="nav-item">*/}
							{/*						<a href="index.html" className="nav-link">*/}
							{/*                            Homepage 1*/}
							{/*						</a>*/}
							{/*					</li>*/}
							{/*				</ul>*/}
							{/*			</li>*/}
							{/*			<li className="nav-item dropdown">*/}
							{/*				<a className="nav-link" href="#">*/}
							{/*                    One-Page <i className="fas fa-angle-right ml-1" />*/}
							{/*				</a>*/}
							{/*				<ul className="dropdown-menu">*/}
							{/*					<li className="nav-item">*/}
							{/*						<a href="index-one-page.html" className="nav-link">*/}
							{/*                            Homepage 1*/}
							{/*						</a>*/}
							{/*					</li>*/}
							{/*				</ul>*/}
							{/*			</li>*/}
							{/*		</ul>*/}
							{/*	</li>*/}
							<li className="nav-item">
								<Link to="/chart" className="nav-link">
                  Charts
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/services" className="nav-link">
                  Services
								</Link>
							</li>

							{user &&
							<li className="nav-item dropdown">
								<div className="nav-link cursor-1">
									Profile
								</div>
								<ul className='dropdown-menu'>
									<li className="nav-item">
										<Link to="/" className="nav-link">
											Profile Details
										</Link>
									</li>
									<hr/>
									<li className="nav-item">
										<Link to="/profile/watchlist" className="nav-link">
											Watchlist
										</Link>
									</li>
								</ul>
							</li>
							}
						</ul>
						{/* Navbar Icons */}
						{/*<ul className="navbar-nav icons">*/}
						{/*	<li className="nav-item">*/}
						{/*		<a*/}
						{/*			href="#"*/}
						{/*			className="nav-link"*/}
						{/*			data-toggle="modal"*/}
						{/*			data-target="#search"*/}
						{/*		>*/}
						{/*			<i className="fas fa-search" />*/}
						{/*		</a>*/}
						{/*	</li>*/}
						{/*	<li className="nav-item social">*/}
						{/*		<a href="#" className="nav-link">*/}
						{/*			<i className="fab fa-facebook-f" />*/}
						{/*		</a>*/}
						{/*	</li>*/}
						{/*	<li className="nav-item social">*/}
						{/*		<a href="#" className="nav-link">*/}
						{/*			<i className="fab fa-twitter" />*/}
						{/*		</a>*/}
						{/*	</li>*/}
						{/*</ul>*/}
						{/* Navbar Toggler */}
						<ul className="navbar-nav toggle">
							<li className="nav-item">
								<a
									href="#"
									className="nav-link"
									data-toggle="modal"
									data-target="#menu"
								>
									<i className="fas fa-bars toggle-icon m-0" />
								</a>
							</li>
						</ul>
						{/* Navbar Action Button */}
						{!user && (
							<ul className="navbar-nav action">
								<li className="nav-item ml-3">
									<Link to='/login' className='btn ml-lg-auto btn-bordered-white'>Login</Link>
								</li>
							</ul>
						)}
						{/*{user && (*/}
						{/*	<ul className="navbar-nav action">*/}
						{/*		<li className="nav-item ml-3">*/}
						{/*			<Link to='/logout' className='btn ml-lg-auto btn-bordered-white'>Logout</Link>*/}
						{/*		</li>*/}
						{/*	</ul>*/}
						{/*)}*/}
					</div>
				</nav>
			</header>
		</Fragment>
	);
};

export default Header;
