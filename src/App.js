import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import ContactList from './containers/ContactList/ContactList';
import NewContact from './containers/NewContact/NewContact';
import IndividualContact from './containers/IndividualContact/IndividualContact';
import Login from './auth/Login/login';
import Register from './auth/Register/register';

const App = () => {
	return (
		<div className='App'>
			<Header />
			<Switch>
				<Route path='/' exact component={ContactList} />
				<Route path='/newcontact' exact component={NewContact} />
				<Route path='/contact/:id' exact component={IndividualContact} />
				<Route path='/login' exact component={Login} />
				<Route path='/register' exact component={Register} />
				<Route path='*' component={Login} />
			</Switch>
		</div>
	);
};

export default App;
