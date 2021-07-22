import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'


const UserEditScreen = ({ history, match }) => {
    const userId = match.params.id
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error} = userDetails

    const userUpdate = useSelector((state) => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate 

    useEffect (() => {
        if(successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/usuarios')
        } else {
            dispatch(getUserDetails(userId))
        }
    }, [userId, dispatch, successUpdate, history ])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    }

    return (
        <>
            <Link to='/produtos' className='btn btn-light my-3'>
            Voltar
            </Link>
            <FormContainer>
            <h1>Editar Produto</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' className='py-3'>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                        type='name'
                        placeholder='Nome'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email' className='py-3'>
                        <Form.Label>Endereço de E-mail</Form.Label>
                        <Form.Control
                        type='email'
                        placeholder='E-Mail'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='isAdmin' className='py-3'>
                        <Form.Check
                        type='checkbox'
                        label='Administrador?'
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                        ></Form.Check>
                    </Form.Group>
                    <Button type='submit' variant='primary' className='py-3'>
                        Editar
                    </Button>
                </Form>
            )}
            </FormContainer>
        </>
    )
}

export default UserEditScreen