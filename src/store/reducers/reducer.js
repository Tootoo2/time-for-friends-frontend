import * as actionTypes from '../actions/actionTypes';

const initialState = { contacts: [] };

const setContacts = (state, action) => {
	return { ...state, contacts: action.payload };
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_CONTACTS: {
			return setContacts(state, action);
		}
		default:
			return state;
	}
};

export default reducer;
