import React, { Component } from 'react';
import axios from 'axios';

import styles from './ContactForm.module.css';
import Modal from '../UI/Modal/Modal'
import location from './location.json';

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
			country: false,
			city: false,
		},
		touched: {
			firstName: false,
			lastName: false,
			phoneNumber: false,
			email: false,
    },
    showModal:false,
	};

	checkValidity = e => {
		const updateIsValid = { ...this.state.isValid };
		const isTouched = { ...this.state.touched };
		const updatedContact = { ...this.state.contact };

		const nameRegex = /^[A-ZÅÄÖa-zåäö][A-ZÅÄÖa-zåäö.\s-]{1,25}$/;
		const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]{5,12}$/;
		const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

		switch (e.target.name) {
			case 'firstName':
				updatedContact.name.firstName = e.target.value;
				nameRegex.test(e.target.value)
					? (updateIsValid.firstName = true)
					: (updateIsValid.firstName = false);

				isTouched.firstName = true;
				this.setState({
					contact: updatedContact,
					isValid: updateIsValid,
					touched: isTouched,
				});
				break;
			case 'lastName':
				updatedContact.name.lastName = e.target.value;
				nameRegex.test(e.target.value)
					? (updateIsValid.lastName = true)
					: (updateIsValid.lastName = false);

				isTouched.lastName = true;
				this.setState({
					contact: updatedContact,
					isValid: updateIsValid,
					touched: isTouched,
				});
				break;
			case 'phoneNumber':
				updatedContact.phoneNumber = e.target.value;
				phoneRegex.test(e.target.value)
					? (updateIsValid.phoneNumber = true)
					: (updateIsValid.phoneNumber = false);

				isTouched.phoneNumber = true;
				this.setState({
					contact: updatedContact,
					isValid: updateIsValid,
					touched: isTouched,
				});
				break;
			case 'mail':
				updatedContact.email = e.target.value;
				emailRegex.test(e.target.value)
					? (updateIsValid.email = true)
					: (updateIsValid.email = false);

				isTouched.email = true;
				this.setState({
					contact: updatedContact,
					isValid: updateIsValid,
					touched: isTouched,
				});
				break;
			case 'country':
				updateIsValid.country = true;
				updatedContact.location.country = e.target.value;
				this.setState({ contact: updatedContact, isValid: updateIsValid });
				break;
			case 'city':
				updateIsValid.city = true;
				updatedContact.location.city = e.target.value;
				const time = location.filter(
					location =>
						updatedContact.location.city === location.city &&
						updatedContact.location.country === location.country,
				);
				updatedContact.location.timeZone = time[0].timezone;
				this.setState({ contact: updatedContact, isValid: updateIsValid });
				break;
			default:
				console.log('something went wrong');
				break;
		}
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

	isFormReady() {
		const arrayOfTruth = Object.values(this.state.isValid).filter(
			v => v === true,
		);
		return arrayOfTruth.length === 6 ? true : false;
	}

	render() {
		const countries = location.map(location => location.country);
		const countriesSet = new Set([...countries]);
		const countriesArr = Array.from(countriesSet);

		const city = location.filter(
			location => location.country === this.state.contact.location.country,
    );
    const sortedCities = [...city].sort((a,b) => a.city > b.city)
    console.log(sortedCities)

		return (
			<div className={styles.FormContainer}>
        <Modal>HEJ</Modal>
				<form className={styles.TheForm} onSubmit={this.submitForm}>
					<div className={styles.InputContainer}>
						<input
							className={styles.InputFields}
							type='text'
							value={this.state.contact.name.firstName}
							name='firstName'
							placeholder='First Name'
							onChange={this.checkValidity}
						/>
						{!this.state.isValid.firstName && this.state.touched.firstName ? (
							<p className={styles.InvalidInput}>Invalid name</p>
						) : null}
					</div>
					<div className={styles.InputContainer}>
						<input
							className={styles.InputFields}
							type='text'
							value={this.state.contact.name.lastName}
							name='lastName'
							placeholder='Last Name'
							onChange={this.checkValidity}
						/>
						{!this.state.isValid.lastName && this.state.touched.lastName ? (
							<p className={styles.InvalidInput}>Invalid name</p>
						) : null}
					</div>
					<div className={styles.InputContainer}>
						<input
							className={styles.InputFields}
							type='text'
							value={this.state.contact.phoneNumber}
							name='phoneNumber'
							placeholder='Phone Number'
							onChange={this.checkValidity}
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
							value={this.state.contact.email}
							name='mail'
							placeholder='Mail'
							onChange={this.checkValidity}
						/>
						{!this.state.isValid.email && this.state.touched.email ? (
							<p className={styles.InvalidInput}>Invalid email</p>
						) : null}
					</div>
					<select
						className={styles.InputFields}
						value={this.state.contact.location.country}
						name='country'
						placeholder='Country'
						onChange={this.checkValidity}
					>
						<option value=''>Select Country</option>
						{countriesArr.map(location => (
							<option key={location}>{location}</option>
						))}
					</select>
					<select
						className={styles.InputFields}
						value={this.state.contact.location.city}
						name='city'
						placeholder='City'
						onChange={this.checkValidity}
					>
						<option>Select City</option>
						{sortedCities.map((city, i) => (
							<option key={i}>{city.city}</option>
						))}
					</select>

					{this.isFormReady() ? (
						<button type='submit'>Submit</button>
					) : (
						<button type='submit' disabled>
							Submit
						</button>
					)}
				</form>
			</div>
		);
	}
}

export default ContactForm;
