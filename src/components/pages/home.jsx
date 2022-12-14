import React from "react";

const Home = () => {
    console.log('in home');
    return (
        <React.Fragment>
            <>
                {/*====== Preloader Area Start ======*/}
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
                {/*====== Preloader Area End ======*/}
                {/*====== Scroll To Top Area Start ======*/}
                <div id="scrollUp" title="Scroll To Top">
                    <i className="fas fa-arrow-up" />
                </div>
                {/*====== Scroll To Top Area End ======*/}
                <div className="main overflow-hidden">
                    {/* ***** Header Start ***** */}
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
                    {/* ***** Header End ***** */}
                    {/* ***** Welcome Area Start ***** */}
                    <section
                        id="home"
                        className="section welcome-area bg-overlay overflow-hidden d-flex align-items-center"
                    >
                        <div className="container">
                            <div className="row align-items-center">
                                {/* Welcome Intro Start */}
                                <div className="col-12 col-md-7">
                                    <div className="welcome-intro">
                                        <h1 className="text-white">
                                            We are digital agency &amp; Marketing
                                        </h1>
                                        <p className="text-white my-4">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                            Impedit nihil tenetur minus quidem est deserunt molestias
                                            accusamus harum ullam tempore debitis et, expedita, repellat
                                            delectus aspernatur neque itaque qui quod.
                                        </p>
                                        {/* Buttons */}
                                        <div className="button-group">
                                            <a href="#" className="btn btn-bordered-white">
                                                Start a Project
                                            </a>
                                            <a
                                                href="#"
                                                className="btn btn-bordered-white d-none d-sm-inline-block"
                                            >
                                                Contact Us
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-5">
                                    {/* Welcome Thumb */}
                                    <div className="welcome-thumb-wrapper mt-5 mt-md-0">
              <span className="welcome-thumb-1">
                <img
                    className="welcome-animation d-block ml-auto"
                    src="assets/img/welcome/thumb_1.png"
                    alt=""
                />
              </span>
                                        <span className="welcome-thumb-2">
                <img
                    className="welcome-animation d-block"
                    src="assets/img/welcome/thumb_2.png"
                    alt=""
                />
              </span>
                                        <span className="welcome-thumb-3">
                <img
                    className="welcome-animation d-block"
                    src="assets/img/welcome/thumb_3.png"
                    alt=""
                />
              </span>
                                        <span className="welcome-thumb-4">
                <img
                    className="welcome-animation d-block"
                    src="assets/img/welcome/thumb_4.png"
                    alt=""
                />
              </span>
                                        <span className="welcome-thumb-5">
                <img
                    className="welcome-animation d-block"
                    src="assets/img/welcome/thumb_5.png"
                    alt=""
                />
              </span>
                                        <span className="welcome-thumb-6">
                <img
                    className="welcome-animation d-block"
                    src="assets/img/welcome/thumb_6.png"
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
                    <section className="section promo-area ptb_100">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-md-6 col-lg-4 res-margin">
                                    {/* Single Promo */}
                                    <div className="single-promo color-1 bg-hover hover-bottom text-center p-5">
                                        <h3 className="mb-3">trend design</h3>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                            <strong>Aspernatur provident unde</strong> ex eligendi magni sit
                                            impedit iusto, sed ad fuga minima, dignissimos ducimus autem
                                            molestias, nostrum nesciunt enim? Ea, non hic voluptates dolorum
                                            impedit eveniet dolorem temporibus illo incidunt quis minima
                                            facere doloribus sit maiores, blanditiis labore quasi,
                                            accusantium quaerat!
                                        </p>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4 res-margin">
                                    {/* Single Promo */}
                                    <div className="single-promo color-2 bg-hover active hover-bottom text-center p-5">
                                        <h3 className="mb-3">Keyword ranking</h3>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                            Aspernatur provident unde ex eligendi magni sit impedit iusto,
                                            sed ad fuga minima,
                                            <strong>dignissimos ducimus autem</strong> molestias, nostrum
                                            nesciunt enim? Ea, non hic voluptates dolorum impedit eveniet
                                            dolorem temporibus illo incidunt quis minima facere doloribus
                                            sit maiores, blanditiis labore quasi, accusantium quaerat!
                                        </p>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    {/* Single Promo */}
                                    <div className="single-promo color-3 bg-hover hover-bottom text-center p-5">
                                        <h3 className="mb-3">Social media</h3>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                            Aspernatur provident unde ex eligendi magni sit impedit iusto,
                                            sed ad fuga minima, dignissimos ducimus autem molestias, nostrum
                                            nesciunt enim? Ea, non hic voluptates
                                            <strong>dolorum impedit eveniet dolorem temporibus</strong>
                                            illo incidunt quis minima facere doloribus sit maiores,
                                            blanditiis labore quasi, accusantium quaerat!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* ***** Promo Area End ***** */}
                    {/* ***** Content Area Start ***** */}
                    <section className="section content-area bg-grey ptb_150">
                        {/* Shape Top */}
                        <div className="shape shape-top">
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
                        <div className="container">
                            <div className="row justify-content-between">
                                <div className="col-12 col-lg-6">
                                    {/* Content Inner */}
                                    <div className="content-inner text-center">
                                        {/* Section Heading */}
                                        <div className="section-heading text-center mb-3">
                                            <h2>We help to grow your business.</h2>
                                            <p className="d-none d-sm-block mt-4">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                Laborum obcaecati dignissimos quae quo ad iste ipsum officiis
                                                deleniti asperiores sit.
                                            </p>
                                            <p className="d-block d-sm-none mt-4">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                Laborum obcaecati.
                                            </p>
                                        </div>
                                        {/* Content List */}
                                        <ul className="content-list text-left">
                                            {/* Single Content List */}
                                            <li className="single-content-list media py-2">
                                                <div className="content-icon pr-4">
                    <span className="color-1">
                      <i className="fas fa-angle-double-right" />
                    </span>
                                                </div>
                                                <div className="content-text media-body">
                    <span>
                      <b>Online Presence</b>
                      <br />
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Veritatis, distinctio.
                    </span>
                                                </div>
                                            </li>
                                            {/* Single Content List */}
                                            <li className="single-content-list media py-2">
                                                <div className="content-icon pr-4">
                    <span className="color-1">
                      <i className="fas fa-angle-double-right" />
                    </span>
                                                </div>
                                                <div className="content-text media-body">
                    <span>
                      <b>Marketing Stretagy</b>
                      <br />
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Veritatis, distinctio.
                    </span>
                                                </div>
                                            </li>
                                            {/* Single Content List */}
                                            <li className="single-content-list media py-2">
                                                <div className="content-icon pr-4">
                    <span className="color-1">
                      <i className="fas fa-angle-double-right" />
                    </span>
                                                </div>
                                                <div className="content-text media-body">
                    <span>
                      <b>Promote Local Sales</b>
                      <br />
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Veritatis, distinctio.
                    </span>
                                                </div>
                                            </li>
                                        </ul>
                                        <a href="#" className="btn btn-bordered mt-4">
                                            Learn More
                                        </a>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6">
                                    {/* Service Thumb */}
                                    <div className="service-thumb mx-auto pt-4 pt-lg-0">
                                        <img src="assets/img/content/content_thumb.png" alt="" />
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
                        src="assets/img/content/profile-icons/profile_icon_1.svg"
                    />
                  </span>
                                                <span className="profile-icon icon-2">
                    <img
                        className="icon-2-img"
                        src="assets/img/content/profile-icons/profile_icon_2.svg"
                    />
                  </span>
                                                <span className="profile-icon icon-3">
                    <img
                        className="icon-3-img"
                        src="assets/img/content/profile-icons/profile_icon_1.svg"
                    />
                  </span>
                                                <span className="profile-icon icon-4">
                    <img
                        className="icon-4-img"
                        src="assets/img/content/profile-icons/profile_icon_2.svg"
                    />
                  </span>
                                            </div>
                                            {/* Profile Circle */}
                                            <div className="profile-circle circle-md">
                  <span className="profile-icon icon-5">
                    <img
                        className="icon-5-img"
                        src="assets/img/content/profile-icons/profile_icon_3.svg"
                    />
                  </span>
                                                <span className="profile-icon icon-6">
                    <img
                        className="icon-6-img"
                        src="assets/img/content/profile-icons/profile_icon_3.svg"
                    />
                  </span>
                                                <span className="profile-icon icon-7">
                    <img
                        className="icon-7-img"
                        src="assets/img/content/profile-icons/profile_icon_3.svg"
                    />
                  </span>
                                            </div>
                                            {/* Profile Circle */}
                                            <div className="profile-circle circle-sm">
                  <span className="profile-icon icon-8">
                    <img
                        className="icon-8-img"
                        src="assets/img/content/profile-icons/profile_icon_4.svg"
                    />
                  </span>
                                                <span className="profile-icon icon-9">
                    <img
                        className="icon-9-img"
                        src="assets/img/content/profile-icons/profile_icon_4.svg"
                    />
                  </span>
                                            </div>
                                        </div>
                                        <img
                                            className="folder-img"
                                            src="assets/img/content/folders.png"
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6">
                                    {/* Content Inner */}
                                    <div className="content-inner text-center pt-sm-4 pt-lg-0 mt-sm-5 mt-lg-0">
                                        {/* Section Heading */}
                                        <div className="section-heading text-center mb-3">
                                            <h2>
                                                Work smarter,
                                                <br />
                                                not harder.
                                            </h2>
                                            <p className="d-none d-sm-block mt-4">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                Laborum obcaecati dignissimos quae quo ad iste ipsum officiis
                                                deleniti asperiores sit.
                                            </p>
                                            <p className="d-block d-sm-none mt-4">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                Laborum obcaecati.
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
                      <b>Digital Agency &amp; Marketing</b>
                      <br />
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Veritatis, distinctio.
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
                      <b>Planning To Startup</b>
                      <br />
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Veritatis, distinctio.
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
                      <b>Content Management</b>
                      <br />
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Veritatis, distinctio.
                    </span>
                                                </div>
                                            </li>
                                        </ul>
                                        <a href="#" className="btn btn-bordered mt-4">
                                            Learn More
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* ***** Content Area End ***** */}
                    {/* ***** Service Area End ***** */}
                    <section id="service" className="section service-area bg-grey ptb_150">
                        {/* Shape Top */}
                        <div className="shape shape-top">
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
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-10 col-lg-7">
                                    {/* Section Heading */}
                                    <div className="section-heading text-center">
                                        <h2>We provide the best digital services</h2>
                                        <p className="d-none d-sm-block mt-4">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                            Laborum obcaecati dignissimos quae quo ad iste ipsum officiis
                                            deleniti asperiores sit.
                                        </p>
                                        <p className="d-block d-sm-none mt-4">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                            Laborum obcaecati.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6 col-lg-4">
                                    {/* Single Service */}
                                    <div className="single-service p-4">
                                        <span className="flaticon-rocket-launch color-1 icon-bg-1" />
                                        <h3 className="my-3">Data Analytics</h3>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectet ur adipisicing elit, sed
                                            do eiusmod tempor incididunt emit.
                                        </p>
                                        <a className="service-btn mt-3" href="#">
                                            Learn More
                                        </a>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    {/* Single Service */}
                                    <div className="single-service p-4">
                                        <span className="flaticon-monitoring color-2 icon-bg-2" />
                                        <h3 className="my-3">Website Growth</h3>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectet ur adipisicing elit, sed
                                            do eiusmod tempor incididunt emit.
                                        </p>
                                        <a className="service-btn mt-3" href="#">
                                            Learn More
                                        </a>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    {/* Single Service */}
                                    <div className="single-service p-4">
                                        <span className="flaticon-web color-3 icon-bg-3" />
                                        <h3 className="my-3">Seo Ranking</h3>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectet ur adipisicing elit, sed
                                            do eiusmod tempor incididunt emit.
                                        </p>
                                        <a className="service-btn mt-3" href="#">
                                            Learn More
                                        </a>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    {/* Single Service */}
                                    <div className="single-service p-4">
                                        <span className="flaticon-smartphone color-4 icon-bg-4" />
                                        <h3 className="my-3">App Development</h3>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectet ur adipisicing elit, sed
                                            do eiusmod tempor incididunt emit.
                                        </p>
                                        <a className="service-btn mt-3" href="#">
                                            Learn More
                                        </a>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    {/* Single Service */}
                                    <div className="single-service p-4">
                                        <span className="flaticon-email color-5 icon-bg-5" />
                                        <h3 className="my-3">Email Marketing</h3>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectet ur adipisicing elit, sed
                                            do eiusmod tempor incididunt emit.
                                        </p>
                                        <a className="service-btn mt-3" href="#">
                                            Learn More
                                        </a>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    {/* Single Service */}
                                    <div className="single-service p-4">
                                        <span className="flaticon-affiliate color-6 icon-bg-6" />
                                        <h3 className="my-3">Affiliate Marketing</h3>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectet ur adipisicing elit, sed
                                            do eiusmod tempor incididunt emit.
                                        </p>
                                        <a className="service-btn mt-3" href="#">
                                            Learn More
                                        </a>
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
                    {/* ***** Service Area End ***** */}
                    {/*====== Contact Area Start ======*/}
                    <section id="contact" className="contact-area ptb_100">
                        <div className="container">
                            <div className="row justify-content-between align-items-center">
                                <div className="col-12 col-lg-5">
                                    {/* Section Heading */}
                                    <div className="section-heading text-center mb-3">
                                        <h2>Let's connect!</h2>
                                        <p className="d-none d-sm-block mt-4">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                            Laborum obcaecati dignissimos quae quo ad iste ipsum officiis
                                            deleniti asperiores sit.
                                        </p>
                                        <p className="d-block d-sm-none mt-4">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                            Laborum obcaecati.
                                        </p>
                                    </div>
                                    {/* Contact Us */}
                                    <div className="contact-us">
                                        <ul>
                                            {/* Contact Info */}
                                            <li className="contact-info color-1 bg-hover active hover-bottom text-center p-5 m-3">
                  <span>
                    <i className="fas fa-mobile-alt fa-3x" />
                  </span>
                                                <a className="d-block my-2" href="#">
                                                    <h3>+89 (0) 2354 5470091</h3>
                                                </a>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                </p>
                                            </li>
                                            {/* Contact Info */}
                                            <li className="contact-info color-3 bg-hover active hover-bottom text-center p-5 m-3">
                  <span>
                    <i className="fas fa-envelope-open-text fa-3x" />
                  </span>
                                                <a className="d-none d-sm-block my-2" href="#">
                                                    <h3>mail@company.com</h3>
                                                </a>
                                                <a className="d-block d-sm-none my-2" href="#">
                                                    <h3>mail@your company.com</h3>
                                                </a>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*====== Contact Area End ======*/}
                    {/*====== Call To Action Area Start ======*/}
                    <section className="section cta-area bg-overlay ptb_100">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12 col-lg-10">
                                    {/* Section Heading */}
                                    <div className="section-heading text-center m-0">
                                        <h2 className="text-white">
                                            Looking for the best digital agency &amp; marketing solution?
                                        </h2>
                                        <p className="text-white d-none d-sm-block mt-4">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                            Laborum obcaecati dignissimos quae quo ad iste ipsum officiis
                                            deleniti asperiores sit.
                                        </p>
                                        <p className="text-white d-block d-sm-none mt-4">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                            Laborum obcaecati.
                                        </p>
                                        <a href="#" className="btn btn-bordered-white mt-4">
                                            Contact Us
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*====== Call To Action Area End ======*/}
                    {/*====== Footer Area Start ======*/}
                    <footer className="section footer-area">
                        {/* Footer Top */}
                        <div className="footer-top ptb_100">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-sm-6 col-lg-3">
                                        {/* Footer Items */}
                                        <div className="footer-items">
                                            {/* Footer Title */}
                                            <h3 className="footer-title text-uppercase mb-2">About Us</h3>
                                            <ul>
                                                <li className="py-2">
                                                    <a className="text-black-50" href="#">
                                                        Company Profile
                                                    </a>
                                                </li>
                                                <li className="py-2">
                                                    <a className="text-black-50" href="#">
                                                        Testimonials
                                                    </a>
                                                </li>
                                                <li className="py-2">
                                                    <a className="text-black-50" href="#">
                                                        Careers
                                                    </a>
                                                </li>
                                                <li className="py-2">
                                                    <a className="text-black-50" href="#">
                                                        Partners
                                                    </a>
                                                </li>
                                                <li className="py-2">
                                                    <a className="text-black-50" href="#">
                                                        Affiliate Program
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3">
                                        {/* Footer Items */}
                                        <div className="footer-items">
                                            {/* Footer Title */}
                                            <h3 className="footer-title text-uppercase mb-2">Services</h3>
                                            <ul>
                                                <li className="py-2">
                                                    <a className="text-black-50" href="#">
                                                        Web Application
                                                    </a>
                                                </li>
                                                <li className="py-2">
                                                    <a className="text-black-50" href="#">
                                                        Product Management
                                                    </a>
                                                </li>
                                                <li className="py-2">
                                                    <a className="text-black-50" href="#">
                                                        User Interaction Design
                                                    </a>
                                                </li>
                                                <li className="py-2">
                                                    <a className="text-black-50" href="#">
                                                        UX Consultant
                                                    </a>
                                                </li>
                                                <li className="py-2">
                                                    <a className="text-black-50" href="#">
                                                        Social Media Marketing
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3">
                                        {/* Footer Items */}
                                        <div className="footer-items">
                                            {/* Footer Title */}
                                            <h3 className="footer-title text-uppercase mb-2">Support</h3>
                                            <ul>
                                                <li className="py-2">
                                                    <a className="text-black-50" href="#">
                                                        Frequently Asked
                                                    </a>
                                                </li>
                                                <li className="py-2">
                                                    <a className="text-black-50" href="#">
                                                        Terms &amp; Conditions
                                                    </a>
                                                </li>
                                                <li className="py-2">
                                                    <a className="text-black-50" href="#">
                                                        Privacy Policy
                                                    </a>
                                                </li>
                                                <li className="py-2">
                                                    <a className="text-black-50" href="#">
                                                        Help Center
                                                    </a>
                                                </li>
                                                <li className="py-2">
                                                    <a className="text-black-50" href="#">
                                                        Contact Us
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-3">
                                        {/* Footer Items */}
                                        <div className="footer-items">
                                            {/* Footer Title */}
                                            <h3 className="footer-title text-uppercase mb-2">Follow Us</h3>
                                            <p className="mb-2">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                Tenetur, quae.
                                            </p>
                                            {/* Social Icons */}
                                            <ul className="social-icons list-inline pt-2">
                                                <li className="list-inline-item px-1">
                                                    <a href="#">
                                                        <i className="fab fa-facebook" />
                                                    </a>
                                                </li>
                                                <li className="list-inline-item px-1">
                                                    <a href="#">
                                                        <i className="fab fa-twitter" />
                                                    </a>
                                                </li>
                                                <li className="list-inline-item px-1">
                                                    <a href="#">
                                                        <i className="fab fa-google-plus" />
                                                    </a>
                                                </li>
                                                <li className="list-inline-item px-1">
                                                    <a href="#">
                                                        <i className="fab fa-linkedin-in" />
                                                    </a>
                                                </li>
                                                <li className="list-inline-item px-1">
                                                    <a href="#">
                                                        <i className="fab fa-instagram" />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Footer Bottom */}
                        <div className="footer-bottom bg-grey">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12">
                                        {/* Copyright Area */}
                                        <div className="copyright-area d-flex flex-wrap justify-content-center justify-content-sm-between text-center py-4">
                                            {/* Copyright Left */}
                                            <div className="copyright-left">
                                                ?? Copyrights 2020 Digimax All rights reserved.
                                            </div>
                                            {/* Copyright Right */}
                                            <div className="copyright-right">
                                                Made with <i className="fas fa-heart" /> By
                                                <a href="#">Themeland</a>
                                            </div>
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
                    {/*====== Modal Responsive Menu Area End ======*/}
                </div>
                {/* ***** All jQuery Plugins ***** */}
                {/* jQuery(necessary for all JavaScript plugins) */}
                {/* Bootstrap js */}
                {/* Plugins js */}
                {/* Active js */}
            </>

        </React.Fragment>
    );
}

export default Home;