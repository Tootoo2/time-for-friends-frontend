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
		isValid: {
			firstName: false,
			lastName: false,
			phoneNumber: false,
			email: false,
		},
		touched: {
			firstName: false,
			lastName: false,
			phoneNumber: false,
			email: false,
		},
	};

	updateContactForm = e => {
		const updatedContact = { ...this.state.contact };
		this.checkValidity(e.target.name, e.target.value);

		switch (e.target.name) {
			case 'firstName':
				if (this.state.isValid.firstName) {
					updatedContact.name.firstName = e.target.value;
					this.setState({ contact: updatedContact });
				}
				break;
			case 'lastName':
				if (this.state.isValid.lastName) {
					updatedContact.name.lastName = e.target.value;
					this.setState({ contact: updatedContact });
				}
				break;
			case 'phoneNumber':
				if (this.state.isValid.phoneNumber) {
					updatedContact.phoneNumber = e.target.value;
					this.setState({ contact: updatedContact });
				}
				break;
			case 'mail':
				if (this.state.isValid.email) {
					updatedContact.email = e.target.value;
					this.setState({ contact: updatedContact });
				}
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
	};

	checkValidity(inputField, value) {
		const updateIsValid = { ...this.state.isValid };
		const isTouched = { ...this.state.touched };
		const nameRegex = /^[A-za-z][a-z.\s-]{1,15}$/;
		const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]{5,12}$/;
		const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
		switch (inputField) {
			case 'firstName':
				nameRegex.test(value)
					? (updateIsValid.firstName = true)
					: (updateIsValid.firstName = false);
				isTouched.firstName = true;
				this.setState({ isValid: updateIsValid, touched: isTouched });
				break;
			case 'lastName':
				nameRegex.test(value)
					? (updateIsValid.lastName = true)
					: (updateIsValid.lastName = false);
				isTouched.lastName = true;
				this.setState({ isValid: updateIsValid, touched: isTouched });
				break;
			case 'phoneNumber':
				phoneRegex.test(value)
					? (updateIsValid.phoneNumber = true)
					: (updateIsValid.phoneNumber = false);
				isTouched.phoneNumber = true;
				this.setState({ isValid: updateIsValid, touched: isTouched });
				break;
			case 'mail':
				emailRegex.test(value)
					? (updateIsValid.email = true)
					: (updateIsValid.email = false);
				isTouched.email = true;
				this.setState({ isValid: updateIsValid, touched: isTouched });
				break;
			case 'country':
				console.log(value);
				break;
			default:
				console.log('something went wrong');
				break;
		}
	}

	submitForm = e => {
		this.isFormReady();
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

	isFormReady() {
		const arrayOfTruth = Object.values(this.state.isValid).filter(v => v === true);
		return arrayOfTruth.length === 4 ? true : false;
	}

	render() {
		return (
			<div className={styles.FormContainer}>
				<form className={styles.TheForm} onSubmit={this.submitForm}>
					<div className={styles.InputContainer}>
						<input
							className={styles.InputFields}
							type='text'
							name='firstName'
							placeholder='First Name'
							onBlur={this.updateContactForm}
						/>
						{!this.state.isValid.firstName && this.state.touched.firstName ? (
							<p className={styles.InvalidInput}>Invalid name</p>
						) : null}
					</div>
					<div className={styles.InputContainer}>
						<input
							className={styles.InputFields}
							type='text'
							name='lastName'
							placeholder='Last Name'
							onBlur={this.updateContactForm}
						/>
						{!this.state.isValid.lastName && this.state.touched.lastName ? (
							<p className={styles.InvalidInput}>Invalid name</p>
						) : null}
					</div>
					<div className={styles.InputContainer}>
						<input
							className={styles.InputFields}
							type='text'
							name='phoneNumber'
							placeholder='Phone Number'
							onBlur={this.updateContactForm}
						/>
						{!this.state.isValid.phoneNumber &&
						this.state.touched.phoneNumber ? (
							<p className={styles.InvalidInput}>Invalid number</p>
						) : null}
					</div>
					<div className={styles.InputContainer}>
						<input
							className={styles.InputFields}
							type='text'
							name='mail'
							placeholder='Mail'
							onBlur={this.updateContactForm}
						/>
						{!this.state.isValid.email && this.state.touched.email ? (
							<p className={styles.InvalidInput}>Invalid email</p>
						) : null}
					</div>
					<select
						className={styles.InputFields}
						type='text'
						name='country'
						placeholder='Country'
						onChange={this.updateContactForm}
					></select>
					<select
						className={styles.InputFields}
						type='text'
						value={this.state.contact.location.city}
						name='city'
						placeholder='City'
						onChange={this.updateContactForm}
					></select>
					<input
						className={styles.InputFields}
						type='text'
						value={this.state.contact.location.timeZone}
						name='timeZone'
						placeholder='Time Zone'
						onChange={this.updateContactForm}
					/>
					{this.isFormReady() ? <button type="submit">Submit</button>:<button type='submit' disabled>Submit</button>}
				</form>
			</div>
		);
	}
}

export default ContactForm;
