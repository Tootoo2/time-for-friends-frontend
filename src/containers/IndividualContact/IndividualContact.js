import React from 'react';

import styles from './IndividualContact.module.css';

const individualContact = props => {
	const contact = props.location.state;

	return (
		<>
			<h2>
				{contact.name.firstName} {contact.name.lastName}
			</h2>
      <div className={styles.Wrapper}>
			<div className={styles.IndividualContactContainer}>
				<div className={styles.Column}>
					<p>Email: </p>
					<p>Phone: </p>
					<p>Country: </p>
					<p>City: </p>
				</div>
				<div className={styles.Column2}>
					<p>{contact.email}</p>
					<p>{contact.phoneNumber}</p>
					<p>{contact.location.country}</p>
					<p>{contact.location.city}</p>
				</div>
			</div>
      </div>
		</>
	);
};

export default individualContact;
