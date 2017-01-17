import axios from 'axios'
import {SET_CURRENT_USER, LOGIN_FAIL} from './types'
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
            dispatch(setCurrentUser(data))
        }).catch((error) => {
            dispatch({type: LOGIN_FAIL, payload: error})
        })
    }
}
