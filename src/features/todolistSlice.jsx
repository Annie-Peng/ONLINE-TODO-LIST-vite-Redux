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
      state.todos.push({ content: action.payload });
      state.uncompleted++;
    },
    updateItem: (state, action) => {
      const index = state.todos.findIndex(task => task.id === action.payload.id);
      state.todos[index].content = action.payload.content;
    },
    deleteItem: (state, action) => {
      const index = state.todos.findIndex(task => {
        task.id === action.payload;
      });
      console.log(index)
      state.todos.splice(index, 1);
      const uncompletedData = state.todos.filter(task => !task.completed);
      state.uncompleted = uncompletedData.length;
    },
    toggleCompleteItem: (state, action) => {
      const index = state.todos.findIndex(task => task.id === action.payload);
      state.todos[index].status = !state.todos[index].status;
      const uncompletedData = state.todos.filter(task => !task.status);
      state.uncompleted = uncompletedData.length;
    },
    clearAllCompleteItem: (state) => {
      const newTodos = state.todos.filter((task) => !task.status);
      state.todos = newTodos;
      state.uncompleted = newTodos.length;
    },
    getItem: (state, action) => {
      const uncompletedData = action.payload.filter(task => !task.status);
      state.todos = action.payload;
      state.uncompleted = uncompletedData.length;
    }
  }
})

export const fetchData = (token) => async (dispatch) => {
  try {
    const res = await axios('https://todolist-api.hexschool.io/todos', {
      headers: {
        Authorization: token,
      },
    });
    dispatch(getItem(res.data.data))
  }
  catch (err) {
    console.log(err)
  }
}

export const deleteItemDispatch = (id, token) => async (dispatch) => {
  try {
    await axios.delete(`https://todolist-api.hexschool.io/todos/${id}`, {
      headers: {
        Authorization: token
      }
    });
    dispatch(deleteItem(id))
  }
  catch (err) {
    console.log(err)
  }
}

export const updateItemDispatch = (e, id, token) => async (dispatch) => {
  const content = e.target.value;
  if (!content) return dispatch(deleteItemDispatch(id, token))
  try {
    await axios.put(`https://todolist-api.hexschool.io/todos/${id}`, {
      content: content
    }, {
      headers: {
        Authorization: token
      }
    })
    dispatch(updateItem(id, content))
  }
  catch (err) {
    console.log(err)
  }
}

export const toggleCompleteItemDispatch = (id, token) => async (dispatch) => {
  try {
    await axios.patch(`https://todolist-api.hexschool.io/todos/${id}/toggle`, {}, {
      headers: {
        Authorization: token
      }
    })
    dispatch(toggleCompleteItem(id))
  }
  catch (err) {
    console.log(err.response.data.message)
  }
}

export const clearAllCompleteItemDispatch = (tasks, token) => async (dispatch) => {
  try {
    await tasks.todos.filter(task => {
      task.status && axios.delete(`https://todolist-api.hexschool.io/todos/${task.id}`, {
        headers: {
          Authorization: token
        }
      });
    })
    dispatch(clearAllCompleteItem());
  }
  catch (err) {
    console.log(err)
  }
}


export const { addItem, updateItem, deleteItem, toggleCompleteItem, clearAllCompleteItem, getItem } = todolistSlice.actions;

export const selectTodolist = (state) => state.todolist;

export default todolistSlice.reducer;
