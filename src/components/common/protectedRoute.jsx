import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { StoreContext } from './stateProvider';

const ProtectedRoute = () => {
	const { state } = useContext(StoreContext);
	const user = state?.user;
	return !user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
