import React, { Component } from 'react';
import { connect } from 'react-redux';

import People from '../../components/People/People';
import Clock from '../../components/Clock/Clock';
import styles from './ContactList.module.css';
import { fetchContacts, deleteContact } from '../../store/actions/actions';

class ContactList extends Component {
	state = {
		search: '',
		filterByFirstName: true,
	};

	componentDidMount() {
		this.props.onFetchContacts();
	}

	handleSearchInput(e) {
		e.preventDefault();
		let input = e.target.value;
		let inputToLowerCase = input
			.toLowerCase()
			.split('')
			.join('');
		this.setState({ search: inputToLowerCase });
	}

	renderPeople = () => {
		const peopleToRender = this.props.contacts
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
					removePerson={() => this.props.onDeleteContacts(p._id)}
				></People>
			));
		if (this.state.filterByFirstName) {
			const renderToArray = Array.from(peopleToRender);
			renderToArray.sort((a, b) =>
				a.props.person.name.firstName > b.props.person.name.firstName ? 1 : -1,
			);
			return renderToArray;
		} else {
			const renderToArray = Array.from(peopleToRender);
			renderToArray.sort((a, b) =>
				a.props.person.location.timeZone > b.props.person.location.timeZone
					? 1
					: -1,
			);
			return renderToArray;
		}
	};

	filterContacts = () => {
		const test = (
			<> <p style={{display: 'inline-block'}}>Filter contacts by:  </p>
				<span style={this.state.filterByFirstName ? {backgroundColor: '#f0ffd9', cursor: 'pointer', margin: '5px', border: '1px solid gray'}: {backgroundColor: 'white', cursor: 'pointer', margin: '5px', border: '1px solid gray'}}
					onClick={() =>
						this.setState({ filterByFirstName: !this.state.filterByFirstName })
					}
				>
					First Name
				</span>
				<span style={!this.state.filterByFirstName ? {backgroundColor: '#f0ffd9', cursor: 'pointer', width: '150px', margin: '5px', border: '1px solid gray'}: {backgroundColor: 'white', cursor: 'pointer', margin: '5px', border: '1px solid gray'}}
					onClick={() =>
						this.setState({ filterByFirstName: !this.state.filterByFirstName })
					}
				>
					Time Zone
				</span>
			</>
    );
    return test
	};

	render() {
		return (
			<>
				<h4>My Contacts</h4>
				<Clock />
				<input
					className={styles.SearchBar}
					placeholder='search...'
					onKeyUp={e => this.handleSearchInput(e)}
				></input>
        <br/>
        {this.filterContacts()}
				<div className={styles.ContactRow}>{this.renderPeople()}</div>
			</>
		);
	}
}

const mapStateToProps = state => {
	return {
		contacts: state.contacts,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchContacts: () => dispatch(fetchContacts()),
		onDeleteContacts: id => dispatch(deleteContact(id)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ContactList);
