import React, {useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {logout} from '../../services/authService';
import {store} from '../../App';

const Logout = () => {

	const {dispatch} = useContext(store);

	const navigate = useNavigate();

	useEffect(() => {
		logout();
		dispatch({type: 'REMOVE_USER'});
		navigate('/');
	}, []);

	return null;
};

export default Logout;