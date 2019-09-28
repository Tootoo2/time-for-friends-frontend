import React from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header'
import ContactList from './containers/ContactList/ContactList';
import NewContact from './containers/NewContact/NewContact';
import IndividualContact from './containers/IndividualContact/IndividualContact'
import Login from './auth/login';

const App = () => {
	return (
		<div className='App'>
      <Header />
			<Route path='/' exact component={ContactList} />
			<Route path='/newcontact' exact component={NewContact} />
      <Route path='/contact/:id' exact component={IndividualContact}></Route>
      <Route path='/login' exact component={Login}></Route>
		</div>
	);
};

export default App;
