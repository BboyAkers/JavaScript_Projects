import './style.css'

type Todo = {
  id: string;
  description: string;
  status: "active" | "completed";
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

  const fetchTodos = async () => {
    isLoading = true;
    todos = await fetch(`${import.meta.env.VITE_API_URL}/`).then(res => res.json());
    isLoading = false;
    renderTodoList(todos);
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
    checkbox.checked = item.status === "completed";
    checkbox.addEventListener('change', () => {
      changeTodoStatus(item.id);
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
  };

  const changeTodoStatus = async (id: string) => {
      await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: todos.find(todo => todo.id === id)?.description,
          status: todos.find(todo => todo.id === id)?.status === "active" ? "completed" : "active",
        }),
      }).then(res => res.json());
      fetchTodos();
      renderTodoList(todos);
      calculateTodosLeft();
  };

  const updateTodoDescription = (index: number, newText: string) => {
    todos[index].description = newText;
    renderTodoList(todos);
  }

  const addTodo = async (todoText: string) => {
    await fetch(`${import.meta.env.VITE_API_URL}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: todoText,
          status: "active",
        }),
      }).then(res => res.json());
    fetchTodos();
    renderTodoList(todos);
    calculateTodosLeft();
  }

  const deleteTodo = async(id: string) => {
    await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json());
    fetchTodos();
    renderTodoList(todos);
    calculateTodosLeft();
  }

  const calculateTodosLeft = () => {
    const todosLeftCount = todos.filter(todo => todo.status === "active").length;
    todosLeft.textContent = `${todosLeftCount} item${todosLeftCount === 1 ? '' : 's'} left`;
    return todosLeftCount;
  }

  const clearCompletedTodos = () => {
    todos = todos.filter(todo => todo.status === "active");
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
    const activeTodos = todos.filter(todo => todo.status === "active");
    renderTodoList(activeTodos);
  });

  filterCompletedButton.addEventListener('click', () => {
    const completedTodos = todos.filter(todo => todo.status === "completed");
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
