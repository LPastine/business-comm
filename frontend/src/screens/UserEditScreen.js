import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

const UserEditScreen = () => {

  return (
    <>
      <Link to='/usuarios' className='btn btn-light my-3'>
        Voltar
      </Link>
      <FormContainer>
        <h1>Editar Usário</h1>
          <Form>
            <Form.Group controlId='name' className='py-3'>
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type='name'
                placeholder='Nome'
                value='nome'
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className='py-3'>
              <Form.Label>Endereço de E-mail</Form.Label>
              <Form.Control
                type='email'
                placeholder='E-Mail'
                value='email'
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isAdmin' className='py-3'>
              <Form.Check
                type='checkbox'
                label='Administrador?'
                checked='isAdmin'
              ></Form.Check>
            </Form.Group>
            <Button type='submit' variant='primary' className='py-3'>
              Editar
            </Button>
          </Form>
      </FormContainer>
    </>
  )
}

export default UserEditScreen