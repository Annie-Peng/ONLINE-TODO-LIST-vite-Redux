import { useState, useMemo } from 'react';
import axios from 'axios';
const toDoListTitle = ['全部', '待完成', '已完成']

export default function ToDoList({ tasks, dispatch }) {
  const [titleClass, setTitleClass] = useState(0);

  async function updateItemDispatch(e, id) {
    const obj = {
      id: id,
      item: e.target.value
    }
    try {
      await axios.patch(`https://fathomless-brushlands-42339.herokuapp.com/todo2/${obj.id}`, obj)
      return dispatch({
        type: 'updateItem',
        id: obj.id,
        item: obj.item
      })
    }
    catch (err) {
      console.log(err)
    }
  }

  async function deleteItemDispatch(id) {
    try {
      await axios.delete(`https://fathomless-brushlands-42339.herokuapp.com/todo2/${id}`)
      return dispatch({
        type: 'deleteItem',
        id: id
      })
    }
    catch (err) {
      console.log(err)
    }
  }

  async function toggleCompleteItemDispatch(id) {
    try {
      await axios.patch(`https://fathomless-brushlands-42339.herokuapp.com/todo2/${id}`)
      return dispatch({
        type: 'toggleCompleteItem',
        id: id,
      })
    }
    catch (err) {
      console.log(err)
    }
  }

  async function clearAllCompleteItemDispatch(tasks) {
    try {
      await tasks.todos.filter(task => {
        task.completed &&
          axios.delete(`https://fathomless-brushlands-42339.herokuapp.com/todo2/${task.id}`)
        return
      })
      return dispatch({
        type: 'clearAllCompleteItem'
      })
    }
    catch (err) {
      console.log(err)
    }
  }

  const visibleTodos = useMemo(() => filterTodos(tasks.todos, titleClass), [tasks.todos, titleClass]);

  return (
    <div className="container w-[500px] bg-white mx-auto mt-4 rounded-[10px] shadow-[0_0_15px_0_rgba(0,0,0,0.15)]">
      <div className="flex title">
        {toDoListTitle.map((title, index) => (
          <button className={`h-[51px] w-full text-center leading-[51px] font-bold border-b-2 ${titleClass === index ? 'border-secondary text-secondary' : 'border-[#EFEFEF] text-tertiary'}`} key={index} type='button'
            onClick={() => setTitleClass(index)}
          >
            {title}
          </button>
        ))}
      </div>
      <ul className="content p-6">
        {visibleTodos.map((task, index) => (
          <li className="border-b mb-4 pb-4 w-full flex relative" key={index}>
            <button type='button' className={task.completed ? "completeBtn" : "unCompleteBtn"} onClick={() => toggleCompleteItemDispatch(task.id)} />
            <input className="ms-4 w-full outline-none leading-5" value={task.item} onChange={(e) => updateItemDispatch(e, task.id)} />
            <button type='button' className="bg-deleteBtn w-[16px] h-[16px] bg-no-repeat absolute right-0 top-[2px]" onClick={() => deleteItemDispatch(task.id)} />
          </li>
        ))}
      </ul >
      <div className="list flex justify-between px-6 pb-6">
        <span>{tasks.uncompleted} 個待完成項目</span>
        <button className='ms-auto' onClick={() => clearAllCompleteItemDispatch(tasks)}>清除已完成項目</button>
      </div>
    </div>

  )
}

function filterTodos(tasks, tab) {
  return tasks.filter(todo => {
    if (tab === 0) {
      return true;
    } else if (tab === 1) {
      return !todo.completed;
    } else if (tab === 2) {
      return todo.completed;
    }
  });
}