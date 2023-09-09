import Header from "./Header";
import EmptyCover from './EmptyCover';
import ToDoListContent from './ToDoListContent';
import { useRef, useEffect } from 'react';
import axios from 'axios';
import { selectTodolist, addItem, fetchData } from "../../features/todolistSlice";
import { getAuth, selectAuth } from '../../features/authSlice'
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

export default function ToDoList() {
  const tasks = useSelector(selectTodolist);
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  useEffect(() => {
    if (!auth.token) {
      const token = Cookies.get('authTokenCookie');
      const nickname = Cookies.get('authNameCookie');
      dispatch(fetchData(token));
      dispatch(getAuth({ token, nickname }))
    } else {
      dispatch(fetchData(auth.token));
    }
  }, [])

  async function addItemDispatch() {
    const content = inputRef.current.value;
    try {
      await axios.post('https://todolist-api.hexschool.io/todos', { content: content }, {
        headers: {
          Authorization: auth.token
        }
      }
      );
      dispatch(addItem(content));
      inputRef.current.value = '';
      dispatch(fetchData(auth.token))
    }
    catch (err) {
      console.log(err)
      alert(err.message)
    }
  }

  return (
    <div className="h-screen bg-colorBackground"  >
      <Header />
      <label className="flex justify-center items-center mt-12">
        <input className="w-[500px] h-[47px] rounded-[10px] p-1 shadow-[0_0_15px_0_rgba(0,0,0,0.15)] indent-4 placeholder:text-tertiary
      " placeholder="新增待辦事項" ref={inputRef} />
        <button className="ms-[-44px] w-[40px] h-[39px] bg-addBtn bg-no-repeat" type='button' onClick={addItemDispatch} />
      </label>
      {tasks.todos && tasks.todos.length !== 0 ? <ToDoListContent /> : <EmptyCover />}
    </div>
  )
}
