import axios from 'axios';
import * as actionTypes from './actionTypes';

export const setContacts = contacts => {
	return {
		type: actionTypes.FETCH_CONTACTS,
		payload: contacts,
	};
};

export const fetchContacts = () => {
	return dispatch => {
		axios.get('http://localhost:3001/api/people').then(response => {
			dispatch(setContacts(response.data));
		});
	};
};

export const deleteContact = id => {
	return dispatch => {
		axios.delete(`http://localhost:3001/api/people/${id}`).then(() => {
			dispatch(fetchContacts());
		});
	};
};
