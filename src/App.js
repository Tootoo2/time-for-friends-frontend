import React from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header/header'
import ContactList from './containers/ContactList/ContactList';
import NewContact from './containers/NewContact/NewContact';

const App = () => {
	return (
		<div className='App'>
      <Header />
			<Route path='/' exact component={ContactList} />
			<Route path='/newcontact' exact component={NewContact} />
		</div>
	);
};

export default App;
