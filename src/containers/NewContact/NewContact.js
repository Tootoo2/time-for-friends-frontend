import React from 'react';

import ContactForm from '../../components/ContactForm/ContactForm';
import styles from './NewContact.module.css'

const newContact = () => {
	return (
		<div className={styles.ContactContainer}>
			<ContactForm />
		</div>
	);
};

export default newContact;
