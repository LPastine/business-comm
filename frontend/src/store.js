import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productLSListReducer, productDeleteReducer, productCreateReducer } from './reducers/productReducers'
import { userListReducer, userLSListReducer, userDeleteReducer, userDetailsReducer } from './reducers/userReducers'

const reducer = combineReducers({
    userList: userListReducer,
    userLSList: userLSListReducer,
    userDelete: userDeleteReducer,
    userDetails: userDetailsReducer,
    productList: productListReducer,
    productLSList: productLSListReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools
    (applyMiddleware(...middleware)))

export default store