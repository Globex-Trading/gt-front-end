import React, {Fragment} from 'react';
import AOS from 'aos';

AOS.init();

const Header = () => {
	console.log('header');
	return (
		<Fragment>
			<header id="header">
				{/* Navbar */}
				<nav
					data-aos="zoom-out"
					data-aos-delay={800}
					className="navbar navbar-expand"
				>
					<div className="container header">
						{/* Navbar Brand*/}
						<a className="navbar-brand" href="/">
							<img
								className="navbar-brand-regular"
								src="assets/img/logo/logo-white.png"
								alt="brand-logo"
							/>
							<img
								className="navbar-brand-sticky"
								src="assets/img/logo/logo.png"
								alt="sticky brand-logo"
							/>
						</a>
						<div className="ml-auto" />
						{/* Navbar */}
						<ul className="navbar-nav items">
							<li className="nav-item dropdown">
								<a className="nav-link" href="#">
                                    Home <i className="fas fa-angle-down ml-1" />
								</a>
								<ul className="dropdown-menu">
									<li className="nav-item dropdown">
										<a className="nav-link" href="#">
                                            Multi-Page <i className="fas fa-angle-right ml-1" />
										</a>
										<ul className="dropdown-menu">
											<li className="nav-item">
												<a href="index.html" className="nav-link">
                                                    Homepage 1
												</a>
											</li>
											<li className="nav-item">
												<a href="index-2.html" className="nav-link">
                                                    Homepage 2
												</a>
											</li>
											<li className="nav-item">
												<a href="index-3.html" className="nav-link">
                                                    Homepage 3
												</a>
											</li>
											<li className="nav-item">
												<a href="index-4.html" className="nav-link">
                                                    Homepage 4
												</a>
											</li>
											<li className="nav-item">
												<a href="index-5.html" className="nav-link">
                                                    Homepage 5
												</a>
											</li>
											<li className="nav-item">
												<a href="index-6.html" className="nav-link">
                                                    Homepage 6
												</a>
											</li>
										</ul>
									</li>
									<li className="nav-item dropdown">
										<a className="nav-link" href="#">
                                            One-Page <i className="fas fa-angle-right ml-1" />
										</a>
										<ul className="dropdown-menu">
											<li className="nav-item">
												<a href="index-one-page.html" className="nav-link">
                                                    Homepage 1
												</a>
											</li>
											<li className="nav-item">
												<a href="index-2-one-page.html" className="nav-link">
                                                    Homepage 2
												</a>
											</li>
											<li className="nav-item">
												<a href="index-3-one-page.html" className="nav-link">
                                                    Homepage 3
												</a>
											</li>
											<li className="nav-item">
												<a href="index-4-one-page.html" className="nav-link">
                                                    Homepage 4
												</a>
											</li>
											<li className="nav-item">
												<a href="index-5-one-page.html" className="nav-link">
                                                    Homepage 5
												</a>
											</li>
											<li className="nav-item">
												<a href="index-6-one-page.html" className="nav-link">
                                                    Homepage 6
												</a>
											</li>
										</ul>
									</li>
								</ul>
							</li>
							<li className="nav-item">
								<a href="about.html" className="nav-link">
                                    About
								</a>
							</li>
							<li className="nav-item">
								<a href="services.html" className="nav-link">
                                    Services
								</a>
							</li>
							<li className="nav-item dropdown">
								<a className="nav-link" href="#">
                                    Pages <i className="fas fa-angle-down ml-1" />
								</a>
								<ul className="dropdown-menu">
									<li className="nav-item">
										<a href="about.html" className="nav-link">
                                            About Us
										</a>
									</li>
									<li className="nav-item">
										<a href="services.html" className="nav-link">
                                            Our Services
										</a>
									</li>
									<li className="nav-item dropdown">
										<a className="nav-link" href="#">
                                            Our Portfolio <i className="fas fa-angle-right ml-1" />
										</a>
										<ul className="dropdown-menu">
											<li className="nav-item">
												<a href="portfolio-grid.html" className="nav-link">
                                                    Portfolio Grid
												</a>
											</li>
											<li className="nav-item">
												<a href="portfolio-minimal.html" className="nav-link">
                                                    Portfolio Minimal
												</a>
											</li>
											<li className="nav-item">
												<a href="portfolio-no-gap.html" className="nav-link">
                                                    Portfolio No Gap
												</a>
											</li>
											<li className="nav-item">
												<a href="portfolio-masonry.html" className="nav-link">
                                                    Portfolio Masonry
												</a>
											</li>
										</ul>
									</li>
									<li className="nav-item">
										<a href="team.html" className="nav-link">
                                            Our Team
										</a>
									</li>
									<li className="nav-item">
										<a href="pricing.html" className="nav-link">
                                            Pricing
										</a>
									</li>
									<li className="nav-item">
										<a href="contact.html" className="nav-link">
                                            Contact
										</a>
									</li>
									<li className="nav-item">
										<a href="404.html" className="nav-link">
                                            404
										</a>
									</li>
								</ul>
							</li>
							<li className="nav-item dropdown">
								<a className="nav-link" href="#">
                                    Blog Pages <i className="fas fa-angle-down ml-1" />
								</a>
								<ul className="dropdown-menu">
									<li className="nav-item dropdown">
										<a className="nav-link" href="#">
                                            Blog Grid <i className="fas fa-angle-right ml-1" />
										</a>
										<ul className="dropdown-menu">
											<li className="nav-item">
												<a href="blog-two-column.html" className="nav-link">
                                                    Grid 2 Column
												</a>
											</li>
											<li className="nav-item">
												<a href="blog-three-column.html" className="nav-link">
                                                    Grid 3 Column
												</a>
											</li>
											<li className="nav-item">
												<a href="blog-left-sidebar.html" className="nav-link">
                                                    Left Sidebar
												</a>
											</li>
											<li className="nav-item">
												<a href="blog-right-sidebar.html" className="nav-link">
                                                    Right Sidebar
												</a>
											</li>
										</ul>
									</li>
									<li className="nav-item dropdown">
										<a className="nav-link" href="#">
                                            Blog Single <i className="fas fa-angle-right ml-1" />
										</a>
										<ul className="dropdown-menu">
											<li className="nav-item">
												<a
													href="blog-details-left-sidebar.html"
													className="nav-link"
												>
                                                    Single Left Sidebar
												</a>
											</li>
											<li className="nav-item">
												<a
													href="blog-details-right-sidebar.html"
													className="nav-link"
												>
                                                    Single Right Sidebar
												</a>
											</li>
										</ul>
									</li>
								</ul>
							</li>
						</ul>
						{/* Navbar Icons */}
						<ul className="navbar-nav icons">
							<li className="nav-item">
								<a
									href="#"
									className="nav-link"
									data-toggle="modal"
									data-target="#search"
								>
									<i className="fas fa-search" />
								</a>
							</li>
							<li className="nav-item social">
								<a href="#" className="nav-link">
									<i className="fab fa-facebook-f" />
								</a>
							</li>
							<li className="nav-item social">
								<a href="#" className="nav-link">
									<i className="fab fa-twitter" />
								</a>
							</li>
						</ul>
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
						<ul className="navbar-nav action">
							<li className="nav-item ml-3">
								<a href="#" className="btn ml-lg-auto btn-bordered-white">
									<i className="fas fa-paper-plane contact-icon mr-md-2" />
                                    Contact Us
								</a>
							</li>
						</ul>
					</div>
				</nav>
			</header>
		</Fragment>
	);
};

export default Header;