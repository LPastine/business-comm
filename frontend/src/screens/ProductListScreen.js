import React, { useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductsLS, deleteProduct, createProduct } from '../actions/productActions'
import { LinkContainer } from 'react-router-bootstrap'
// import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListScreen = ({ history }) => {
    const dispatch = useDispatch()

    const productLSList = useSelector((state) => state.productLSList)
    const { loading, error, products } = productLSList

    const productDelete = useSelector((state) => state.productDelete)
    const {
        loading: loadingDelete,
        error: errorDelete,
    } = productDelete

    const productCreate = useSelector((state) => state.productCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct
    } = productCreate

    useEffect(() => {
        // dispatch({ type: PRODUCT_CREATE_RESET })

        if (successCreate) {
            history.push(`produto/${createdProduct._id}/editar`)
        } else {
            dispatch(listProductsLS())
        }
    }, [dispatch, history, successCreate, createdProduct])

    const deleteHandler = (id) => {
        if (window.confirm('Deseja confirmar?')) {
            dispatch(deleteProduct(id))
            dispatch(listProductsLS())
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
        dispatch(listProductsLS())
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Inventário de Produtos</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Criar Novo Produto
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOME</th>
                            <th>PREÇO</th>
                            <th>CATEGORIA</th>
                            <th>MARCA</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/editar/produto/${product._id}`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() => deleteHandler(product._id)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default ProductListScreen
