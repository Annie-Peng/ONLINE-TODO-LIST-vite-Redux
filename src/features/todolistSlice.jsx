import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const todolistSlice = createSlice({
  name: 'todolist',
  initialState: {
    todos: [],
    uncompleted: 0
  },
  reducers: {
    addItem: (state, action) => {
      state.todos.push({ item: action.payload, uncompleted: false });
      state.uncompleted++;
    },
    updateItem: (state, action) => {
      const index = state.todos.findIndex(task => task.id === action.payload.id);
      state.todos[index].item = action.payload.item;
    },
    deleteItem: (state, action) => {
      const index = state.todos.findIndex(task => task.id === action.payload);
      state.todos.splice(index, 1);
      const uncompletedData = state.todos.filter(task => !task.completed);
      state.uncompleted = uncompletedData.length;
    },
    toggleCompleteItem: (state, action) => {
      const index = state.todos.findIndex(task => task.id === action.payload);
      state.todos[index].completed = !state.todos[index].completed;
      const uncompletedData = state.todos.filter(task => !task.completed);
      state.uncompleted = uncompletedData.length;
    },
    clearAllCompleteItem: (state) => {
      const newTodos = state.todos.filter((task) => !task.completed);
      state.todos = newTodos;
      state.uncompleted = newTodos.length;
    },
    getItem: (state, action) => {
      const uncompletedData = action.payload.filter(task => !task.completed);
      state.todos = action.payload;
      state.uncompleted = uncompletedData.length;
    }
  }
})

export const fetchData = () => async (dispatch) => {
  try {
    const res = await axios('https://fathomless-brushlands-42339.herokuapp.com/todo2');
    dispatch(getItem(res.data))
  }
  catch (err) {
    console.log(err)
  }
}

export const deleteData = (id) => async (dispatch) => {
  try {
    await axios.delete(`https://fathomless-brushlands-42339.herokuapp.com/todo2/${id}`);
    dispatch(deleteItem(id))
  }
  catch (err) {
    console.log(err)
  }
}


export const { addItem, updateItem, deleteItem, toggleCompleteItem, clearAllCompleteItem, getItem } = todolistSlice.actions;

export const selectTodolist = (state) => state.todolist;

export default todolistSlice.reducer;
