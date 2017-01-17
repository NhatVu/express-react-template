import {SET_CURRENT_USER, LOGIN_FAIL} from '../actions/types';
import _ from 'lodash';

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default(state = initialState, action = {}) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !_.isEmpty(action.payload.user),
                user: action.payload.user
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        default:
            return state;
    }
}
