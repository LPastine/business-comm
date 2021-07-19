import products from '../products'

import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LS_LIST_REQUEST,
    PRODUCT_LS_LIST_SUCCESS,
    PRODUCT_LS_LIST_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    // PRODUCT_CREATE_REQUEST,
    // PRODUCT_CREATE_SUCCESS,
    // PRODUCT_CREATE_FAIL
} from '../constants/productConstants'

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: products
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.message
        })
    }
}

export const listProductsLS = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LS_LIST_REQUEST })

        let productsLS = localStorage.getItem('localProducts')
        productsLS = JSON.parse(productsLS)
        console.log(productsLS);

        dispatch({
            type: PRODUCT_LS_LIST_SUCCESS,
            payload: productsLS
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LS_LIST_FAIL,
            payload: error.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST,
        })

        //  REMOVE FROM STATE
        const { productList: { products } } = getState()
        let newProductList = []
        for (let index = 0; index < products.length; index++) {
            const product = products[index];
            if (product._id !== id.toString()) {
                newProductList.push(product)
            }
        }

        // REMOVE FROM LS
        localStorage.clear()
        localStorage.setItem('localProducts', JSON.stringify(newProductList))


        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.message,
        })
    }
}