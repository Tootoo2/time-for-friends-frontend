import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/authToken';
import * as actionTypes from './actionTypes';

export const setContacts = contacts => {
	return {
		type: actionTypes.FETCH_CONTACTS,
		payload: contacts,
	};
};

export const setCurrentUser = decoded => {
	return {
		type: actionTypes.SET_CURRENT_USER,
		payload: decoded,
	};
};

export const fetchContacts = id => {
	return dispatch => {
		axios
			.get(`http://localhost:3001/api/users/getContacts/${id}`)
			.then(response => {
				dispatch(setContacts(response.data.contacts));
			});
	};
};

export const registerUser = (userData, history) => dispatch => {
	axios
		.post('http://localhost:3001/api/users/register', userData)
		.then(res => history.push('/login'))
		.catch(err =>
			dispatch({
				type: actionTypes.GET_ERRORS,
				payload: err.response.data,
			}),
		);
};

export const loginUser = userData => dispatch => {
	axios
		.post('http://localhost:3001/api/users/login', userData)
		.then(res => {
			const { token } = res.data;
			localStorage.setItem('jwtToken', token);
			setAuthToken(token);
			const decoded = jwt_decode(token);
			dispatch(setCurrentUser(decoded));
		})
		.catch(err =>
			dispatch({
				type: actionTypes.GET_ERRORS,
				payload: err.response.data,
			}),
		);
};

export const logoutUser = () => dispatch => {
	localStorage.removeItem('jwtToken');
	setAuthToken(false);
	dispatch(setCurrentUser({}));
};
