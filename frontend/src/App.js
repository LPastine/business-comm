import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductListScreen from './screens/ProductListScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
// import ProductEditScreen from './screens/ProductEditScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-4'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/produtos' component={ProductListScreen} />
          <Route path='/usuarios' component={UserListScreen} />
          <Route path='/editar/usuario/:id/' component={UserEditScreen} />
          {/* <Route path='/produtos/:id/edit' component={ProductEditScreen} /> */}
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App

