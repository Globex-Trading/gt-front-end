import React, {Fragment} from "react";

const Footer = () => {
    return (
        <Fragment>
            <footer className="text-center text-lg-start bg-white text-muted shadow-lg">
                {/* Section: Social media */}
                <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                    {/* Left */}
                    <div className="ml-5 d-none d-lg-block">
                        <span>Get connected with us on social networks:</span>
                    </div>
                    {/* Left */}
                    {/* Right */}
                    <div className='mr-md-5'>
                        <a href className="mr-5 link-secondary">
                            <i className="fab fa-facebook-f"/>
                        </a>
                        <a href='' className="mr-5 link-secondary">
                            <i className="fab fa-google"/>
                        </a>
                        <a href className="mr-5 link-secondary">
                            <i className="fab fa-github"/>
                        </a>
                    </div>
                    {/* Right */}
                </section>
                {/* Copyright */}
                <div className="text-center p-4" style={{backgroundColor: 'rgba(0, 0, 0, 0.025)'}}>
                    © 2022 Copyright <span className="text-reset font-weight-bolder">Globex Trading</span>
                </div>
                {/* Copyright */}
            </footer>
        </Fragment>
    )
}

export default Footer;