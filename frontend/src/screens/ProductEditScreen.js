import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
// import { listProductDetails } from '../actions/productActions'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
      
  }, [])

  const submitHandler = (e) => {
    e.preventDefault()
    // UPDATE PRODUCT
  }

  return (
    <>
      <Link to='/produtos' className='btn btn-light my-3'>
        Voltar
      </Link>
      <FormContainer>
        <h1>Editar Produto</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='py-3'>
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type='name'
                placeholder='Nome do produto'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price' className='py-3'>
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type='number'
                placeholder='Inserir preço'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image' className='py-3'>
              <Form.Label>Foto</Form.Label>
              <Form.Control
                type='text'
                placeholder='Inserir url da foto do produto'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='brand' className='py-3'>
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type='text'
                placeholder='Inserir marca'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock' className='py-3'>
              <Form.Label>Estoque</Form.Label>
              <Form.Control
                type='number'
                placeholder='Quantidade de Estoque'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category' className='py-3'>
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                type='text'
                placeholder='Inserir categoria'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description' className='py-3'>
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type='text'
                placeholder='Inserir descrição'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='py-3'>
              Editar
            </Button>
          </Form>
      </FormContainer>
    </>
  )
}

export default ProductEditScreen