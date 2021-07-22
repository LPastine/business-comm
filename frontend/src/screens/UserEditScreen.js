import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails } from '../actions/userActions'


const UserEditScreen = ({ match }) => {
    const userId = match.params.id
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    useEffect (() => {
        dispatch(getUserDetails(userId))
    }, [userId, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <Link to='/usuarios' className='btn btn-light my-3'>
            Voltar
            </Link>
            <FormContainer>
            <h1>Editar Usário</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Form>
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