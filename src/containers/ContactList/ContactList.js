import React, { Component } from 'react';
import axios from 'axios';

import People from '../../components/People/People';
import styles from './ContactList.module.css';

class ContactList extends Component {
	state = {
		people: [],
		search: '',
	};

	componentDidMount() {
		axios.get('http://localhost:3001/api/people').then(response => {
			this.setState({ people: response.data });
		});
	}

	filterPeople(e) {
		e.preventDefault();
		console.log(e.target.value);
		this.setState({ search: e.target.value });
	}

	renderPeople = () => {
		const peopleToRender = this.state.people
			.filter(
				p =>
					p.name.firstName.includes(this.state.search) ||
					p.name.lastName.includes(this.state.search),
			)
			.map(p => (
				<People
					key={p._id}
					person={p}
					removePerson={this.removePerson}
				></People>
			));
		return peopleToRender;
	};

	removePerson = id => {
		const updatedContacts = this.state.people.filter(
			person => person._id !== id,
		);
		axios
			.delete(`http://localhost:3001/api/people/${id}`)
			.then(response => console.log(response.data));
		this.setState({ people: updatedContacts });
	};

	render() {
		return (
			<>
				<h4>My Contacts</h4>
				<input
					placeholder='search...'
					onKeyUp={e => this.filterPeople(e)}
				></input>
				<div className={styles.ContactRow}>{this.renderPeople()}</div>
			</>
		);
	}
}

export default ContactList;
