import React from 'react';

const people = props => {
	return (
		<div onClick={() => props.removePerson(props.person._id)}>{props.person.name.firstName}</div>
	);
};

export default people;
