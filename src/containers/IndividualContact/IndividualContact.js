import React from 'react';

import styles from './IndividualContact.module.css';

const individualContact = props => {
	const contact = props.location.state;
	return (
		<div className={styles.IndividualContactContainer}>
			<ul>
				<li>{contact.name.firstName} {contact.name.lastName}</li>
        <li>{contact.phoneNumber}</li>
        <li>{contact.email}</li>
        <li>{contact.location.country}</li>
        <li>{contact.location.timeZone}</li>
			</ul>
		</div>
	);
};

export default individualContact;
