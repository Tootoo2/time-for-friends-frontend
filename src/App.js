import React, { Component } from 'react';
import './App.css';
import People from './components/people';
import axios from 'axios';

class App extends Component {
	state = {
		people: [],
	};

	componentDidMount() {
		axios.get('http://localhost:3001/api/people').then(response => {
			this.setState({ people: response.data });
		});
	}

	renderPeople = () => {
		return this.state.people.map(p => (
			<People key={p._id} person={p} removePerson={this.removePerson}></People>
		));
	};

	removePerson = id => {
		const updatedContacts = this.state.people.filter(
			person => person._id !== id,
		);
		this.setState({ people: updatedContacts });
	};

	render() {
		return (
			<div className='App'>
				<h4>Hej</h4>
				{this.renderPeople()}
			</div>
		);
	}
}

export default App;
