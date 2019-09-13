import React from 'react';
import style from './People.module.css';

const people = props => {
	return (
		<div
			className={style.contactCard}
			onClick={() => props.removePerson(props.person._id)}
		>
			<h4>
				{props.person.name.firstName} {props.person.name.lastName}
			</h4>
		</div>
	);
};

export default people;
