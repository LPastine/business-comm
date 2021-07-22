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
    USER_DETAILS_RESET,
} from '../constants/userConstants'

export const userListReducer = (state = { users: [] }, action) => {
    switch(action.type) {
        case USER_LIST_REQUEST:
            return { loading: true}
        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload }
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userLSListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LS_LIST_REQUEST:
            return { loading: true, users: [] }
        case USER_LS_LIST_SUCCESS:
            return { loading: false, users: action.payload }
        case USER_LS_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userDeleteReducer = (state = { }, action) => {
    switch(action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true}
        case USER_DELETE_SUCCESS:
            return { loading: false, success: true }
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case USER_DETAILS_REQUEST:
        return { ...state, loading: true }
      case USER_DETAILS_SUCCESS:
        return { loading: false, user: action.payload }
      case USER_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      case USER_DETAILS_RESET:
        return { user: {} }
      default:
        return state
    }
  }