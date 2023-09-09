import { useState, useMemo } from 'react';
import { deleteItemDispatch, toggleCompleteItemDispatch, clearAllCompleteItemDispatch, updateItemDispatch, selectTodolist } from '../../features/todolistSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth } from '../../features/authSlice';
const toDoListTitle = ['全部', '待完成', '已完成']

export default function ToDoListContent() {
  const [titleClass, setTitleClass] = useState(0);
  const tasks = useSelector(selectTodolist);
  const { token } = useSelector(selectAuth);
  const dispatch = useDispatch();

  console.log(tasks.todos)

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
            <button type='button' className={task.status ? "completeBtn" : "unCompleteBtn"} onClick={() => dispatch(toggleCompleteItemDispatch(task.id, token))} />
            <input className="ms-4 w-full outline-none leading-5" value={task.content} onChange={(e) => dispatch(updateItemDispatch(e, task.id, token))} />
            <button type='button' className="bg-deleteBtn w-[16px] h-[16px] bg-no-repeat absolute right-0 top-[2px]" onClick={() => dispatch(deleteItemDispatch(task.id, token))} />
          </li>
        ))}
      </ul >
      <div className="list flex justify-between px-6 pb-6">
        <span>{tasks.uncompleted} 個待完成項目</span>
        <button className='ms-auto' onClick={() => dispatch(clearAllCompleteItemDispatch(tasks, token))}>清除已完成項目</button>
      </div>
    </div>

  )
}

function filterTodos(tasks, tab) {
  return tasks.filter(todo => {
    if (tab === 0) {
      return true;
    } else if (tab === 1) {
      return !todo.status;
    } else if (tab === 2) {
      return todo.status;
    }
  });
}