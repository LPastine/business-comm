import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsersLS, deleteUser } from '../actions/userActions'

const UserListScreen = () => {
  const dispatch = useDispatch()

  const userLSList = useSelector((state) => state.userLSList)
  const { loading, error, users } = userLSList

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    dispatch(listUsersLS())
  }, [dispatch, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Deseja confirmar?')) {
      dispatch(deleteUser(id))
  }}

  const createUserHandler = () => {
      console.log('create user');
  }

  return (
    <>
      <Row className='align-items-center'>
            <Col>
                <h1>Usuários</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3' onClick={createUserHandler}>
                    <i className='fas fa-plus'></i> Criar Novo Usuário
                </Button>
            </Col>
        </Row>
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
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/editar/usuario/${user._id}`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
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

export default UserListScreen
