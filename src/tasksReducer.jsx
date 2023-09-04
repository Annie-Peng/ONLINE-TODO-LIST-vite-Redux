export default function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'getItem': {
      const uncompletedData = action.data.filter(task => !task.completed);
      return {
        todos: [
          ...action.data
        ],
        uncompleted: uncompletedData.length
      }

    }
    case 'addItem': {
      const uncompletedData = tasks.todos.filter(task => !task.completed);
      return {
        todos: [
          ...tasks.todos, {
            item: action.item,
            completed: action.completed
          }
        ],
        uncompleted: uncompletedData.length + 1
      }
    }
    case 'updateItem': {
      const result = tasks.todos.map((task) => {
        if (task.id === action.id) {
          return {
            ...task,
            item: action.item
          }
        } else {
          return task
        }
      });
      const uncompletedData = result.filter(task => !task.completed);
      return {
        todos: result,
        uncompleted: uncompletedData.length
      }
    }
    case 'deleteItem': {
      const result = tasks.todos.filter((task) => task.id !== action.id);
      const uncompletedData = result.filter(task => !task.completed);
      return {
        ...tasks,
        todos: result,
        uncompleted: uncompletedData.length
      }
    }
    case 'toggleCompleteItem': {
      const result = tasks.todos.map((task) => {
        if (task.id === action.id) {
          return {
            ...task,
            completed: !task.completed
          }
        } else {
          return task
        }
      })
      const uncompletedData = result.filter(task => !task.completed);
      return {
        ...tasks,
        todos: result,
        uncompleted: uncompletedData.length
      }
    }
    case 'clearAllCompleteItem': {
      const result = tasks.todos.filter((task) => !task.completed);
      return {
        ...tasks,
        todos: result,
        uncompleted: result.length
      }
    }
  }
}