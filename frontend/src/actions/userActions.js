import users from '../users'

import {
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LS_LIST_REQUEST,
    USER_LS_LIST_SUCCESS,
    USER_LS_LIST_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
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

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST,
        })

        //  REMOVE FROM STATE
        const { userList: { users } } = getState()
        let newUserList = []
        for (let index = 0; index < users.length; index++) {
            const user = users[index];
            if (user._id !== id.toString()) {
                newUserList.push(user)
            }
        }

        // UPDATE LS
        localStorage.setItem('localUsers', JSON.stringify(newUserList))


        dispatch({
            type: USER_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.message,
        })
    }
}

export const updateUser = (updatedUser) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST,
        })

        const { userLSList: { users } } = getState()
        let updatedList = []
        for (let index = 0; index < users.length; index++) {
            const user = users[index];
            if (user._id === updatedUser._id.toString()) {
                updatedList.push(updatedUser)
            } else {
                updatedList.push(user)
            }
        }
        localStorage.setItem('localUsers', JSON.stringify(updatedList))

        dispatch({
            type: USER_UPDATE_SUCCESS,
        })

        dispatch({
            type: USER_LS_LIST_SUCCESS,
            payload: updatedList
        })
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
        payload: error.message,
        })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
        type: USER_DETAILS_REQUEST,
        })
      
        const { userLSList: { users } } = getState()
        let userDetails = []
        for (let index = 0; index < users.length; index++) {
            const user = users[index];
            if (user._id === id.toString()) {
                userDetails.push(user)
            }
        }

        dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: userDetails,
        })
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
        payload: error.message,
        })
    }
  }