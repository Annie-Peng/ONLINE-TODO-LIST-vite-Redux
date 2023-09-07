import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import store from './store';
import { Provider } from 'react-redux';
import Login from './components/login';
import Cover from './components/common/Cover';
import Register from './components/register';
import ToDoList from './components/todolist';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path='/' element={<Cover />} >
      <Route index element={<Login />} />
      <Route path='register' element={<Register />} />
    </Route>
    <Route path='todolist' element={<ToDoList />} />
  </>
), {
  basename: '/ONLINE-TODO-LIST-vite-Redux/'
}
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
