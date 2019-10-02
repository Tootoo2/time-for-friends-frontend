import React, { Component } from 'react';
import { connect } from 'react-redux';

import Contact from '../../components/Contact/Contact';
import styles from './ContactList.module.css';
import { fetchContacts, deleteContact } from '../../store/actions/actions';
import Modal from '../../components/UI/Modal/Modal';
import moment from 'moment';

class ContactList extends Component {
	state = {
		search: '',
		isSortedByFirstName: true,
		showModal: false,
		id: null,
		timeRange: { minValue: null, maxValue: null },
	};

	componentDidMount() {
		this.props.onFetchContacts(this.props.user.id);
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

	deleteContact = () => {
		this.props.onDeleteContacts(this.state.id);
		this.setState({ showModal: !this.state.showModal, id: null });
	};

	changeModalState = id => {
		this.setState({ showModal: !this.state.showModal, id });
	};

	contactSelectedHandler = contact => {
		this.props.history.push({
			pathname: 'contact/' + contact._id,
			state: contact,
		});
	};

	sortContactsHandler = () => {
		const sortButtons = (
			<>
				<p>Sort contacts by: </p>
				<div
					style={
						this.state.isSortedByFirstName
							? {
									cursor: 'pointer',
									margin: '5px',
									border: '3px solid #b7cece',
									borderRadius: '5px',
									padding: '5px',
							  }
							: {
									cursor: 'pointer',
									margin: '5px',
									border: '1px solid gray',
									borderRadius: '5px',
									padding: '5px',
							  }
					}
					onClick={() =>
						this.setState({
							isSortedByFirstName: !this.state.isSortedByFirstName,
						})
					}
				>
					First Name
				</div>
				<div
					style={
						!this.state.isSortedByFirstName
							? {
									cursor: 'pointer',
									margin: '5px',
									border: '3px solid #b7cece',
									borderRadius: '5px',
									padding: '5px',
							  }
							: {
									cursor: 'pointer',
									margin: '5px',
									border: '1px solid gray',
									borderRadius: '5px',
									padding: '5px',
							  }
					}
					onClick={() =>
						this.setState({
							isSortedByFirstName: !this.state.isSortedByFirstName,
						})
					}
				>
					Time Zone
				</div>
			</>
		);
		return sortButtons;
	};

	setTimeRange = e => {
		console.log(e.target.value);
		const newMinMax = { ...this.state.timeRange };

		if (e.target.value === 'No Time Filter') {
			newMinMax.minValue = null;
			newMinMax.maxValue = null;
			this.setState({ timeRange: newMinMax });
		} else {
			newMinMax.minValue = parseInt(e.target.value);
			newMinMax.maxValue = parseInt(e.target.value) + 4;
			this.setState({ timeRange: newMinMax });
		}
	};

	renderContacts = () => {
		if (!this.props.user.contacts) {
			return <div>You got no contacts</div>;
		}
		let contactsByTimeInterval = null;
		let contactsToRender = null;
		let contactsAfterSort = null;

		if (this.state.timeRange.minValue !== null) {
			contactsByTimeInterval = this.props.user.contacts.filter(
				p =>
					this.state.timeRange.minValue <=
						moment.tz(new Date(), p.location.timeZone).format('HH') &&
					moment.tz(new Date(), p.location.timeZone).format('HH') <
						this.state.timeRange.maxValue,
			);
		}

		contactsByTimeInterval
			? (contactsToRender = contactsByTimeInterval
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
							removePerson={() => this.changeModalState(p._id)}
						/>
					)))
			: (contactsToRender = this.props.user.contacts
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
							removePerson={() => this.changeModalState(p._id)}
						/>
					)));

		if (this.state.isSortedByFirstName) {
			contactsAfterSort = contactsToRender;
			contactsAfterSort.sort((a, b) =>
				a.props.person.name.firstName > b.props.person.name.firstName ? 1 : -1,
			);
			return contactsAfterSort;
		} else {
			contactsAfterSort = contactsToRender;
			contactsAfterSort.sort((a, b) =>
				a.props.person.location.timeZone > b.props.person.location.timeZone
					? 1
					: -1,
			);
			return contactsAfterSort;
		}
	};

	render() {
		let modalInfo = (
			<div>
				<h4>Do you really want to terminate this friendship?</h4>
				<button onClick={() => this.deleteContact()}>Yes</button>
				<button onClick={this.changeModalState}>No</button>
			</div>
		);

		return (
			<>
				<Modal show={this.state.showModal} modalClosed={this.changeModalState}>
					{modalInfo}
				</Modal>
				<div className={styles.Greeting}>
					<input
						className={styles.InputStyle}
						placeholder='search...'
						onKeyUp={e => this.handleSearchInput(e)}
					></input>
					<select onChange={this.setTimeRange}>
						<option>No Time Filter</option>
						<option value={0}>00 - 04</option>
						<option value={4}>04 - 08</option>
						<option value={8}>08 - 12</option>
						<option value={12}>12 - 16</option>
						<option value={16}>16 - 20</option>
						<option value={20}>20 - 00</option>
					</select>
				</div>
				<div className={styles.FilterButtons}>{this.sortContactsHandler()}</div>
				<div className={styles.ContactRow}>{this.renderContacts()}</div>
			</>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.user,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchContacts: (id) => dispatch(fetchContacts(id)),
		onDeleteContacts: id => dispatch(deleteContact(id)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ContactList);
