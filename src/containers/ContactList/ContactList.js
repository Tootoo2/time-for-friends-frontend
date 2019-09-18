import React, { Component } from 'react';
import { connect } from 'react-redux';

import Contact from '../../components/Contact/Contact';
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

	renderContacts = () => {
		const peopleToRender = this.props.contacts
			.filter(p =>
				p.name.firstName
					.toLowerCase()
					.concat(' ', p.name.lastName.toLowerCase())
					.includes(this.state.search),
			)
			.map(p => (
				<Contact
					key={p._id}
					person={p}
					clicked={() => this.contactSelectedHandler(p)}
					removePerson={() => this.props.onDeleteContacts(p._id)}
				></Contact>
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

	contactSelectedHandler = contact => {
		this.props.history.push({pathname:'contact/' + contact._id, state: contact});
	};

	filterContacts = () => {
		const test = (
			<>
				<p>Filter contacts by: </p>
				<div
					style={
						this.state.filterByFirstName
							? {
									cursor: 'pointer',
									margin: '5px',
                  border: '3px solid green',
                  padding: '5px'
							  }
							: {
									cursor: 'pointer',
									margin: '5px',
                  border: '1px solid gray',
                  padding: '5px'
							  }
					}
					onClick={() =>
						this.setState({ filterByFirstName: !this.state.filterByFirstName })
					}
				>
					First Name
				</div>
				<div
					style={
						!this.state.filterByFirstName
							? {
									cursor: 'pointer',
									margin: '5px',
                  border: '3px solid green',
                  padding: '5px'
							  }
							: {
									cursor: 'pointer',
									margin: '5px',
                  border: '1px solid gray',
                  padding: '5px'
							  }
					}
					onClick={() =>
						this.setState({ filterByFirstName: !this.state.filterByFirstName })
					}
				>
					Time Zone
				</div>
			</>
		);
		return test;
	};

	render() {
		return (
			<>				
			<Clock />
				<div className={styles.Greeting}>
					<input
						className={styles.SearchBar}
						placeholder='search...'
						onKeyUp={e => this.handleSearchInput(e)}
					></input>
				</div>
        <div className={styles.FilterButtons}>{this.filterContacts()}</div>
				<div className={styles.ContactRow}>{this.renderContacts()}</div>
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
