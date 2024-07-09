import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Table from './components/Table.jsx'
import Registration from './components/Registration.jsx'
import Card from './components/Card.jsx'
import Update from './components/Update.jsx'
import ClientSide from '../ClientSide.jsx'
import Sidebar from './components/client/Sidebar.jsx'
import Login from './components/Login.jsx'
import Protected from './components/Protected.jsx'
import Cart from './components/client/Cart.jsx'
import ClientLogin from './components/client/ClientLogin.jsx'
import ClientSignUp from './components/client/ClientSignup.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<ClientSide/>}>
      <Route path='' element = {<Sidebar/>}/>
      <Route path='/cart' element = {<Cart/>}/>
      <Route path='/login' element = {<ClientLogin/>}/>
      <Route path='/signUp' element = {<ClientSignUp/>}/>
    </Route>
    
    <Route path='/admin' element = {<App/>}>
      <Route path='' element = {
        <Protected>
          <Table/>
        </Protected>
      }/>
      <Route path='/admin/card/:id' element = {
        <Protected>
          <Card/>
        </Protected>
      }/>
      <Route path='/admin/login' element = {<Login/>}/>
      <Route path='/admin/update/:id' element={
        <Protected>
          <Update/>
        </Protected>
      }/>
      <Route path='/admin/register' element = {
        <Protected>
          <Registration/>
        </Protected>
      }/>
    </Route>
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
