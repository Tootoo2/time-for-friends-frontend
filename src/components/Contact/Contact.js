import React from 'react';

import Clock from '../Clock/Clock';
import style from './Contact.module.css';

const contact = props => {
	return (
		<div className={style.contactCard}>
      <Clock timeZone={props.person.location.timeZone} />
			<h4 onClick={props.clicked} style={{ cursor: 'pointer' }}>
				{props.person.name.firstName} {props.person.name.lastName}
			</h4>
			<h4>{props.person.location.timeZone}</h4>
		</div>
	);
};

export default contact;
