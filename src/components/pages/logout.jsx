import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService';
import { StoreContext } from '../common/stateProvider';

const Logout = () => {
	const {state, setState } = useContext(StoreContext);

	const navigate = useNavigate();

	useEffect(() => {
		logout();
		setState({...state, ['user']: null});
		navigate('/');
	}, []);

	return null;
};

export default Logout;
