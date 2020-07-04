import React from 'react';
import  { Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Route from './Route';
import About from '../pages/About';
import Dashboard from '../pages/Dashboard';

const Routes : React.FC = () => {

	return (
		<Switch>
			<Route path='/' exact component={SignIn} type="guest" />
			<Route path='/signup' component={SignUp} type="guest" />
			<Route path='/about' component={About} />
			<Route path='/dashboard' component={Dashboard} type="private" />
		</Switch>
	)
}

export default Routes;