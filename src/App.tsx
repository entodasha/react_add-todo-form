import { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { getUserById } from './servises/GetUser';
import { Todo } from './types/Todo';
import users from './api/users';

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [initialTodos, setInitialTodos] = useState<Todo[]>(todos);

  const addTodo = (newTodo: Todo) => {
    setInitialTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const newId = Math.max(...todos.map(todo => todo.id)) + 1;

  return (
    <div className="section">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} id={newId} users={users} />
      <TodoList todos={initialTodos} />
    </div>
  );
};
