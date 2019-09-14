import React from 'react';

import Clock from '../Clock/Clock';
import style from './People.module.css';

const people = props => {
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
		</div>
	);
};

export default people;
