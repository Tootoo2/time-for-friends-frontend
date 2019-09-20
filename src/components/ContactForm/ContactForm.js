import React, { Component } from 'react';
import axios from 'axios';

import styles from './ContactForm.module.css';

class ContactForm extends Component {
	state = {
		contact: {
			name: {
				firstName: '',
				lastName: '',
			},
			phoneNumber: '',
			email: '',
			location: {
				country: '',
				city: '',
				timeZone: '',
			},
		},
	};

	updateContactForm = e => {
		const updatedContact = { ...this.state.contact };

		switch (e.target.name) {
			case 'firstName':
				updatedContact.name.firstName = e.target.value;
				this.setState({ contact: updatedContact });
				break;
			case 'lastName':
				updatedContact.name.lastName = e.target.value;
				this.setState({ contact: updatedContact });
				break;
			case 'phoneNumber':
				updatedContact.phoneNumber = e.target.value;
				this.setState({ contact: updatedContact });
				break;
			case 'mail':
				updatedContact.email = e.target.value;
				this.setState({ contact: updatedContact });
				break;
			case 'country':
				updatedContact.location.country = e.target.value;
				this.setState({ contact: updatedContact });
				break;
			case 'city':
				updatedContact.location.city = e.target.value;
				this.setState({ contact: updatedContact });
				break;
			case 'timeZone':
				updatedContact.location.timeZone = e.target.value;
				this.setState({ contact: updatedContact });
				break;
			default:
				console.log('not valid input');
		}
		console.log(this.state.contact);
	};

	submitForm = e => {
		e.preventDefault();
		axios
			.post('http://localhost:3001/api/people/addcontact', this.state.contact)
			.then(
				res => console.log(res),
				this.setState({
					contact: {
						name: {
							firstName: '',
							lastName: '',
						},
						phoneNumber: '',
						email: '',
						location: {
							country: '',
							city: '',
							timeZone: '',
						},
					},
				}),
			)
			.catch(err => console.error(err));
	};

	render() {
		return (
			<div className={styles.FormContainer}>
				<form id='test' onSubmit={this.submitForm}>
					<div>
						<input
							className={styles.InputFields}
							type='text'
							value={this.state.contact.name.firstName}
							name='firstName'
							placeholder='First Name'
							onChange={this.updateContactForm}
						/>
						<input
							className={styles.InputFields}
							type='text'
							value={this.state.contact.name.lastName}
							name='lastName'
							placeholder='Last Name'
							onChange={this.updateContactForm}
						/>
						<input
							className={styles.InputFields}
							type='text'
							value={this.state.contact.phoneNumber}
							name='phoneNumber'
							placeholder='Phone Number'
							onChange={this.updateContactForm}
						/>
						<input
							className={styles.InputFields}
							type='text'
							value={this.state.contact.email}
							name='mail'
							placeholder='Mail'
							onChange={this.updateContactForm}
						/>
						<input
							className={styles.InputFields}
							type='text'
							value={this.state.contact.location.country}
							name='country'
							placeholder='Country'
							onChange={this.updateContactForm}
						/>
						<input
							className={styles.InputFields}
							type='text'
							value={this.state.contact.location.city}
							name='city'
							placeholder='City'
							onChange={this.updateContactForm}
						/>
						<input
							className={styles.InputFields}
							type='text'
							value={this.state.contact.location.timeZone}
							name='timeZone'
							placeholder='Time Zone'
							onChange={this.updateContactForm}
						/>
					</div>
					<button type='submit'>Submit</button>
				</form>
			</div>
		);
	}
}

export default ContactForm;
