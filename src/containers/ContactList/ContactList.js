import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

import Contact from '../../components/Contact/Contact';
import styles from './ContactList.module.css';
import { fetchContacts } from '../../store/actions/actions';

class ContactList extends Component {
	state = {
		search: '',
		isSortedByFirstName: true,
		showModal: false,
		timeRange: { minValue: null, maxValue: null },
	};

	componentDidMount() {
		if (this.props.auth) {
			this.props.onFetchContacts(this.props.user.id);
		}
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

	changeModalState = () => {
		this.setState({ showModal: !this.state.showModal });
	};

	contactSelectedHandler = contact => {
		this.props.history.push({
			pathname: 'contact/' + contact.name.firstName,
			state: contact,
		});
	};

	sortContactsHandler = () => {
		const sortButtons = (
			<>
				<p>Sort contacts: </p>
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
					.map((p, i) => (
						<Contact
							key={i}
							person={p}
							clicked={() => this.contactSelectedHandler(p)}
						/>
					)))
			: (contactsToRender = this.props.user.contacts
					.filter(p =>
						p.name.firstName
							.toLowerCase()
							.concat(' ', p.name.lastName.toLowerCase())
							.includes(this.state.search),
					)
					.map((p, i) => (
						<Contact
							key={i}
							person={p}
							clicked={() => this.contactSelectedHandler(p)}
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
		if (!this.props.user.contacts) {
			return (
				<div className={styles.NotLoggedIn}>
					<h2>Log in to use this service</h2>
					<div>
						<NavLink
							to='/login'
							exact
							style={{
								textDecoration: 'none',
								color: 'green',
								fontSize: '1.2em',
								margin: '20px',
							}}
						>
							Login
						</NavLink>
						<NavLink
							to='/register'
							exact
							style={{
								textDecoration: 'none',
								color: 'green',
								fontSize: '1.2em',
							}}
						>
							Register
						</NavLink>
					</div>
				</div>
			);
		}

		return (
			<>
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
		auth: state.isAuthenticated,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchContacts: id => dispatch(fetchContacts(id)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ContactList);
