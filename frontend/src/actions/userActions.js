import users from '../users'

import {
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LS_LIST_REQUEST,
    USER_LS_LIST_SUCCESS,
    USER_LS_LIST_FAIL
} from '../constants/userConstants'

export const listUsers = () => async (dispatch) => {
    try {
        dispatch({ type: USER_LIST_REQUEST })

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: users
        })
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.message
        })
    }
}

export const listUsersLS = () => async (dispatch) => {
    try {
        dispatch({ type: USER_LS_LIST_REQUEST })

        let usersLS = localStorage.getItem('localUsers')
        usersLS = JSON.parse(usersLS)

        dispatch({
            type: USER_LS_LIST_SUCCESS,
            payload: usersLS
        })
    } catch (error) {
        dispatch({
            type: USER_LS_LIST_FAIL,
            payload: error.message
        })
    }
}