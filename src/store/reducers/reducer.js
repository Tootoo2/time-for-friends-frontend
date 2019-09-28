import * as actionTypes from '../actions/actionTypes';
import isEmpty from 'is-empty'

const initialState = { contacts: [], isAuthenticated: false, user: {} };

const setContacts = (state, action) => {
	return { ...state, contacts: action.payload };
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_CONTACTS: {
			return setContacts(state, action);
    }
    case actionTypes.SET_CURRENT_USER: {
      return { ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload}
    }
		default:
			return state;
	}
};

export default reducer;
