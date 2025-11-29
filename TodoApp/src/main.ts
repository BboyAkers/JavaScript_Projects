import './style.css'

type Todo = {
  id: string;
  description: string;
  isActive: boolean;
  isCompleted: boolean;
}


document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector<HTMLFormElement>('#add-todo-form')!;
  const todosMessage = document.querySelector<HTMLParagraphElement>('#todos-message')!;
  const todosLeft = document.querySelector<HTMLSpanElement>('#todos-left')!;
  const clearCompletedTodosButton = document.querySelector<HTMLButtonElement>('#clear-completed-todos')!;
  const filterAllButton = document.querySelector<HTMLButtonElement>('#filter-all')!;
  const filterActiveButton = document.querySelector<HTMLButtonElement>('#filter-active')!;
  const filterCompletedButton = document.querySelector<HTMLButtonElement>('#filter-completed')!;

  let todos: Todo[] = [];
  let isLoading = false;

  const fetchTodos = () => {
    isLoading = true;
    // Simulate fetching todos from an API
    setTimeout(() => {
      todos = [
        { id: '1', description: 'Learn TypeScript', isActive: true, isCompleted: false },
        { id: '2', description: 'Build a Todo App', isActive: true, isCompleted: false },
      ];
      isLoading = false;
      renderTodoList(todos);
    }, 1000);
  };

  const todoItem = (item: Todo) => {

    const listItem = document.createElement('li');
    listItem.className = 'h-16 inline-flex items-center px-6 w-full';
    listItem.id = `todo-item-${item.id}`;

    const label = document.createElement('label');
    label.className = 'peer items-center w-full inline-flex cursor-pointer';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'peer mr-3 h-5 w-5 cursor-pointer';
    checkbox.checked = item.isCompleted;
    checkbox.addEventListener('change', () => {
      isCompletedTodo(item.id);
    });

    const span = document.createElement('span');
    span.className = 'peer-checked:text-gray-600 peer-checked:line-through';
    span.textContent = item.description;

    const button = document.createElement('button');
    button.textContent = 'Delete';
    button.className = 'ml-auto text-red-500 hover:text-red-700';
    button.addEventListener('click', () => {
      deleteTodo(item.id);
    });

    label.appendChild(checkbox);
    label.appendChild(span);
    listItem.appendChild(label);
    listItem.appendChild(button);

    return listItem;
  }

  const renderTodoList = (todos: Todo[]) => {
    const todoList = document.querySelector<HTMLUListElement>('#todo-list')!;
    todoList.innerHTML = '';
    todos.forEach((todo) => {
      const listItem = todoItem(todo);
      todoList.appendChild(listItem);
    });
    
    if (!todos.length) {
      isLoading = false;
      todosMessage.textContent= 'Please add your todo items above.';
    }
    if (todos.length) {
      todosMessage.style.display = 'none';
    }
    calculateTodosLeft();
    isLoading = false;
  }

  const isCompletedTodo = (id: string) => {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      todo.isCompleted = !todo.isCompleted;
      renderTodoList(todos);
      calculateTodosLeft();
    }
  };

  const addTodo = (todoText: string) => {
    todos.push({
      id: crypto.randomUUID(),
      description: todoText,
      isActive: true,
      isCompleted: false,
    });
    renderTodoList(todos);
  }

  const deleteTodo = (id: string) => {
    todos = todos.filter(todo => todo.id !== id);
    renderTodoList(todos);
    calculateTodosLeft();
  }

  const calculateTodosLeft = () => {
    const todosLeftCount = todos.filter(todo => !todo.isCompleted).length;
    todosLeft.textContent = `${todosLeftCount} item${todosLeftCount === 1 ? '' : 's'} left`;
    return todosLeftCount;
  }

  const clearCompletedTodos = () => {
    todos = todos.filter(todo => !todo.isCompleted);
    renderTodoList(todos);
  };

  fetchTodos();

  if (isLoading) {
    todosMessage.textContent = 'Loading...';
  }

  filterAllButton.addEventListener('click', () => {
    renderTodoList(todos);
  });

  filterActiveButton.addEventListener('click', () => {
    const activeTodos = todos.filter(todo => !todo.isCompleted);
    renderTodoList(activeTodos);
  });

  filterCompletedButton.addEventListener('click', () => {
    const completedTodos = todos.filter(todo => todo.isCompleted);
    renderTodoList(completedTodos);
  });

  clearCompletedTodosButton.addEventListener('click', () => {
    clearCompletedTodos();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.querySelector<HTMLInputElement>('#new-todo')!;
    const todoText = input.value.trim();
    if (todoText) {
      addTodo(todoText);
      input.value = '';
    }
  });
});
