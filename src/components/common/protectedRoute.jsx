import React, {useEffect, useState} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {getUser} from '../../services/authService';
import toast from 'react-hot-toast';

const ProtectedRoute = () => {
	let user;
	const token = localStorage.getItem('user_token');
	if (!token) user = null;
	const payload = JSON.parse(atob(token.split('.')[1]));
	console.log('payload', payload);


	return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
