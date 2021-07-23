import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsersLS, deleteUser, createUser } from '../actions/userActions'
import { USER_CREATE_RESET } from '../constants/userConstants'

const UserListScreen = ({history}) => {
  const dispatch = useDispatch()

  const userLSList = useSelector((state) => state.userLSList)
  const { loading, error, users } = userLSList

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  const userCreate = useSelector((state) => state.userCreate)
  const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        user: createdUser
    } = userCreate

  useEffect(() => {
    dispatch({ type: USER_CREATE_RESET })

    if (successCreate) {
      history.push(`editar/usuario/${createdUser._id}`)
    } else {
      dispatch(listUsersLS())
    }
  }, [dispatch, successDelete, successCreate, history, createdUser])

  const deleteHandler = (id) => {
    if (window.confirm('Deseja confirmar?')) {
      dispatch(deleteUser(id))
  }}

  const createUserHandler = () => {
    dispatch(createUser())
    dispatch(listUsersLS())
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
