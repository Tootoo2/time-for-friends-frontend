import * as actionTypes from '../actions/actionTypes';
import isEmpty from 'is-empty';

const initialState = { isAuthenticated: false, user: {} };

const setContacts = (state, action) => {
	const updatedUser = { ...state.user };
	updatedUser.contacts = action.payload;
	return {...state, user: updatedUser };
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_CONTACTS: {
			return setContacts(state, action);
		}
		case actionTypes.SET_CURRENT_USER: {
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload,
			};
		}
		default:
			return state;
	}
};

export default reducer;
