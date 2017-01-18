import axios from 'axios'
import {SET_CURRENT_USER, LOGIN_FAIL, LOGOUT_FAIL, LOGOUT_SUCCESS} from './types'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

export function setCurrentUser(user) {
    return {type: SET_CURRENT_USER, payload: user};
}
export function getUserInfo() {
    return function(dispatch) {
        axios.get('/user-info').then((response) => {
            const data = response.data;
            console.log("data after login facebok", data);
            localStorage.setItem('token', data.token);
            axios.defaults.headers.common['Auth'] = data.token
            dispatch(setCurrentUser(data))
        }).catch((error) => {
            dispatch({type: LOGIN_FAIL, payload: error})
        })
    }
}

export function logout() {
    return function(dispatch) {
        axios.post('/users/logout').then((response) => {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Auth']
            dispatch({
                type: LOGOUT_SUCCESS,
                payload: {
                    user: null,
                    isAuthenticated: false
                }
            })
        }).catch((err) => {
            dispatch({type: LOGOUT_FAIL, payload: err})
        })
    }
}
