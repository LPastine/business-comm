import products from '../products'

import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LS_LIST_REQUEST,
    PRODUCT_LS_LIST_SUCCESS,
    PRODUCT_LS_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET
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

export const listProductDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST })

      const { productLSList: { products } } = getState()
  
      const productDetails = []

      for (let index = 0; index < products.length; index++) {
        const product = products[index];
        if (product._id === id.toString()) {
            productDetails.push(product)
        }
    }
  
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: productDetails,
      })
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
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

        // UPDATE LS
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

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST,
        })

        const { productLSList: { products } } = getState()

        const newProductId = parseInt(products[products.length - 1]._id) + 1

        const newProduct = {
            _id: newProductId.toString(),
            name: '',
            image: '',
            description:
                '',
            brand: '',
            category: '',
            price: 0,
            countInStock: 0,
            rating: 0,
            numReviews: 0,
        }
        
        let updatedList = products
        updatedList.push(newProduct)

        console.log(updatedList);
        localStorage.setItem('localProducts', JSON.stringify(updatedList))

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: newProduct
        })

        dispatch({
            type: PRODUCT_LS_LIST_SUCCESS,
            payload: updatedList
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.message,
        })
    }
}