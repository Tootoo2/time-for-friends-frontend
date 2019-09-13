import React, { Component } from 'react';
import axios from 'axios';

import People from '../../components/People/People';
import Clock from '../../components/Clock/Clock';
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
		let input = e.target.value;
		let inputToLowerCase = input
			.toLowerCase()
			.split('')
			.join('');
		this.setState({ search: inputToLowerCase });
	}

	renderPeople = () => {
		const peopleToRender = this.state.people
			.filter(p =>
				p.name.firstName
					.toLowerCase()
					.concat(' ', p.name.lastName.toLowerCase())
					.includes(this.state.search),
			)
			.map(p => (
				<People
					key={p._id}
					person={p}
					removePerson={this.removePerson}
				></People>
			));
    const renderToArray = Array.from(peopleToRender);
    renderToArray.sort((a,b) => a.props.person.name.firstName > b.props.person.name.firstName ? 1 : -1)
		return renderToArray;
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
				<Clock />
				<input
					className={styles.SearchBar}
					placeholder='search...'
					onKeyUp={e => this.filterPeople(e)}
				></input>
				<div className={styles.ContactRow}>{this.renderPeople()}</div>
			</>
		);
	}
}

export default ContactList;
