import React, { Component } from 'react';

class ContactForm extends Component {
	state = {
		contact: {
			name: {
				firstName: '',
				lastName: '',
			},
			phoneNumber: '',
			mail: '',
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
				updatedContact.mail = e.target.value;
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
    console.log(this.state.contact)
	};

	render() {
		return (
			<form>
				<input
					type='text'
					name='firstName'
					placeholder='First Name'
					onChange={this.updateContactForm}
				/>
				<input
					type='text'
					name='lastName'
					placeholder='Last Name'
					onChange={this.updateContactForm}
				/>
				<input
					type='text'
					name='phoneNumber'
					placeholder='Phone Number'
					onChange={this.updateContactForm}
				/>
				<input
					type='text'
					name='mail'
					placeholder='Mail'
					onChange={this.updateContactForm}
				/>
				<input
					type='text'
					name='country'
					placeholder='Country'
					onChange={this.updateContactForm}
				/>
				<input
					type='text'
					name='city'
					placeholder='City'
					onChange={this.updateContactForm}
				/>
				<input
					type='text'
					name='timeZone'
					placeholder='Time Zone'
					onChange={this.updateContactForm}
				/>
			</form>
		);
	}
}

export default ContactForm;