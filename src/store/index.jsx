import { configureStore } from '@reduxjs/toolkit';
import todolistReducer from '../features/todolistSlice';
import authReducer from '../features/authSlice';

const store = configureStore({
  reducer: {
    todolist: todolistReducer,
    auth: authReducer
  }
})

export default store;