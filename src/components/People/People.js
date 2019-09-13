import React from 'react';

import Clock from '../Clock/Clock';
import style from './People.module.css';

const people = props => {
	return (
		<div
			className={style.contactCard}
			onClick={() => props.removePerson(props.person._id)}
		>
			<h4>
				{props.person.name.firstName} {props.person.name.lastName} <br />
				<Clock timeZone={props.person.location.timeZone}/>
			</h4>
		</div>
	);
};

export default people;
