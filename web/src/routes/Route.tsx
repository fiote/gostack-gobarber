import React, { useCallback } from 'react';
import { Route as RdomRoute, RouteProps as RdomRouteProps, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface RouteProps extends RdomRouteProps {
	type?: 'private' | 'guest' | 'normal';
	component: React.ComponentType
}

const Route: React.FC<RouteProps> = ({ type = 'normal', component: Component, ... rest }) => {
	const { user } = useAuth();

	return (
		<RdomRoute {...rest} render={() => {
			if (type == 'private' && !user) return <Redirect to={{ pathname:'/' }} />;
			if (type == 'guest' && user) return <Redirect to={{ pathname:'/dashboard' }} />;
			return <Component />;
		}} />
	)

}

export default Route;