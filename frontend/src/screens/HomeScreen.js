import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts } from '../actions/productActions'
import { listUsers } from '../actions/userActions'

const HomeScreen = () => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const userList = useSelector(state => state.userList)
    const { loading: loadingUsers, error: errorUsers, users } = userList

    useEffect(() => {
        dispatch(listProducts())
        dispatch(listUsers())
        localStorage.setItem('localProducts', JSON.stringify(products))
        localStorage.setItem('localUsers', JSON.stringify(users))
    }, [dispatch, products, users])

    return (
        <>
            <h1>Produtos Cadastrados</h1>
            {loading || loadingUsers ? <Loader /> : error || errorUsers ? <Message variant='danger'>{error}</Message> :
                <Row>
                    {products.map(product => (
                        <Col sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            }
        </>
    )
}

export default HomeScreen
