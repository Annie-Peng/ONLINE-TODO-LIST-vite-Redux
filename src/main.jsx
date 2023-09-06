import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import store from './store';
import { Provider } from 'react-redux';
import Login from './components/login';
import Cover from './components/common/Cover';
import Register from './components/register';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/ONLINE-TODO-LIST-vite-Redux/' element={<Cover />}>
    <Route path='/ONLINE-TODO-LIST-vite-Redux/register' element={<Register />} />
    <Route path='/ONLINE-TODO-LIST-vite-Redux/' element={<Login />} />
  </Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
