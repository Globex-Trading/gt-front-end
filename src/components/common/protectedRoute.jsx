import React, {useEffect, useState} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {getUser} from '../../services/authService';
import toast from 'react-hot-toast';
import {isTokenExpired} from '../../services/httpService';

const ProtectedRoute = (props) => {
	const token = localStorage.getItem('refresh_token');

	const payload = JSON.parse(atob(token.split('.')[1]));
	console.log('payload', payload, payload?.id ,!isTokenExpired(token) ,props.userTypes.includes(payload?.type), '------------');

	if (payload?.id && !isTokenExpired(token) && props.userTypes.includes(payload?.type)) {
		return <Outlet />;
	}else {
		toast.error('You are not authorized to view this page');
		return <Navigate to="/" />;
	}
};

export default ProtectedRoute;
