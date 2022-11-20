import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import { StoreContext } from './stateProvider';


const MenuModal = () => {

    const { user } = useContext(StoreContext);


    return (
        <div id="menu" className="modal fade p-0">
            <div className="modal-dialog dialog-animated">
                <div className="modal-content h-100">
                    <div className="modal-header" data-dismiss="modal">
                        <i className="far fa-times-circle icon-close" />
                    </div>
                    <div className="menu modal-body">
                        <div className="row w-100">
                            <div className="items p-0 col-12">
                                <hr/>
                                <div className="item ">
                                    <Link to='/' >Home</Link>
                                </div>
                                <hr/>
                                <div className="item">
                                    <Link to='/chart'>Chart</Link>
                                </div>
                                {user?.user_type === 'ADMIN' &&
                                    <div>
                                    <hr />
                                <div className="item">
                                    <Link to='/stock-data'>Upload</Link>
                                </div>
                                    </div>
                                }
                                {user &&
                                (<div>
                                    <hr/>
                                <div className="item">
                                    <Link to='/profile' >Profile Details</Link>
                                </div>
                                <hr/>
                                <div className="item">
                                    <Link to='/profile/notifications' >Notifications</Link>
                                </div>
                                <hr/>
                                <div className="item">
                                    <Link to='/profile/watchlist' >Watchlist</Link>
                                </div>
                                <hr/>
                                <div className="item">
                                    <Link to='/profile/alerts' >Alerts</Link>
                                </div>
                                <hr/>
                                <div className="item">
                                    <Link to='/logout' >Logout</Link>
                                </div>
                                </div>)}
                                {!user && (<div><hr/><div className="item"><Link to='/login' className='btn'>Login</Link></div></div>)}



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuModal;