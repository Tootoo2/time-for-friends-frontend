import React from 'react';

import Clock from '../Clock/Clock';
import style from './Contact.module.css';
import { NavLink } from 'react-router-dom';

const contact = props => {
	return (
		<div className={style.contactCard}>
			<Clock timeZone={props.person.location.timeZone} />
			<h4>
				{props.person.name.firstName} {props.person.name.lastName}
			</h4>
			<i
				className='fas fa-trash'
				onClick={() => props.removePerson(props.person._id)}
			></i>
			<NavLink
				to={{
					pathname: `/contact/${props.person._id}`,
					state: { person: props.person },
				}}
				style={{ textDecoration: 'none', color: 'black', fontSize: '1.2em' }}
				activeStyle={{
					textDecoration: 'underline black',
				}}
			>
				New Contact
			</NavLink>
		</div>
	);
};

export default contact;
