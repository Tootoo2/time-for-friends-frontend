import React from 'react';

import Clock from '../Clock/Clock';
import styles from './Contact.module.css';

const contact = props => {
	return (
		<div className={styles.contactCard}>
      <div style={{flex: '2'}}>
      <Clock timeZone={props.person.location.timeZone} />
      </div>
      <div style={{flex: '2'}}>
			<h4 onClick={props.clicked} style={{ cursor: 'pointer' }}>
				{props.person.name.firstName} {props.person.name.lastName}
			</h4>
      </div>
      <div className={styles.TimeZone}>
			<i style={{fontSize: '0.9em'}}>{props.person.location.timeZone}</i>
      </div>
		</div>
	);
};

export default contact;
