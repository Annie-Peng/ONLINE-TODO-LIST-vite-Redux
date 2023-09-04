import Header from "./components/Header";
import EmptyCover from './components/EmptyCover';
import ToDoList from './components/ToDoList';
import { useRef, useReducer, useEffect } from 'react';
import tasksReducer from "./tasksReducer";
import axios from 'axios';

let initialTasks = [];


function App() {

  const inputRef = useRef(null);
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios('https://fathomless-brushlands-42339.herokuapp.com/todo2');
        dispatch({
          type: 'getItem',
          data: res.data
        });
      }
      catch (err) {
        console.log(err)
      }
    };
    fetchData()
  }, [])

  async function addItemDispatch() {
    const obj = {
      item: inputRef.current.value,
      completed: false
    }
    try {
      await axios.post('https://fathomless-brushlands-42339.herokuapp.com/todo2', {
        item: obj.item,
        completed: obj.completed
      });
      dispatch({
        type: 'addItem',
        item: obj.item,
        completed: obj.completed
      }
      );
      inputRef.current.value = '';
    }
    catch (err) {
      console.log(err)
      alert(err.message)
    }

    const data = await fetchData();
    dispatch({
      type: 'getItem',
      data: data
    })
  }

  return (
    <div className="h-screen bg-colorBackground"  >
      <Header />
      <label className="flex justify-center items-center mt-12">
        <input className="w-[500px] h-[47px] rounded-[10px] p-1 shadow-[0_0_15px_0_rgba(0,0,0,0.15)] indent-4 placeholder:text-tertiary
        " placeholder="新增待辦事項" ref={inputRef} />
        <button className="ms-[-44px] w-[40px] h-[39px] bg-addBtn bg-no-repeat" type='button' onClick={addItemDispatch} />
      </label>
      {tasks.todos && tasks.todos.length !== 0 ? <ToDoList tasks={tasks} dispatch={dispatch} /> : <EmptyCover />}
    </div>
  )
}

export default App

async function fetchData() {
  try {
    const res = await axios('https://fathomless-brushlands-42339.herokuapp.com/todo2');
    return res.data
  }
  catch (err) {
    console.log(err)
  }
}
