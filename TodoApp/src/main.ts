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
    const parser = new DOMParser();
    const listItemTemplate = `
    <li class="inline-flex items-center w-full h-16 px-6" id="todo-item-${item.id}">
      <label class="inline-flex items-center w-full cursor-pointer peer">
        <input
          id="check-todo-${item.id}"
          type="checkbox"
          class="w-5 h-5 mr-3 cursor-pointer peer"
          ${item.status === "completed" ? "checked" : ""}
          data-todo-id="${item.id}"
        />
        <span class="peer-checked:text-gray-600 peer-checked:line-through">
          ${item.description}
        </span>
      </label>
      <button
        type="button"
        id="toggle-edit-todo-${item.id}"
        class="mr-2 text-blue-500 hover:text-blue-700"
      >
        Edit
      </button>
      <button
        type="button"
        id="delete-todo-${item.id}"
        class="ml-auto text-red-500 hover:text-red-700"
        data-delete-id="${item.id}"
      >
        Delete
      </button>
    </li>
  `;
    const parsedListItem = parser.parseFromString(listItemTemplate, 'text/html');

    parsedListItem.querySelector(`#check-todo-${item.id}`)!.addEventListener('change', () => {
      changeTodoStatus(item.id);
    });

    parsedListItem.querySelector(`#toggle-edit-todo-${item.id}`)!.addEventListener('click', () => {
      const newDescription = prompt("Edit todo description:", item.description);
      if (newDescription !== null && newDescription.trim() !== '') {
        updateTodoDescription(item.id, newDescription.trim());
      }
    });

    parsedListItem.querySelector(`#delete-todo-${item.id}`)!.addEventListener('click', () => {
      deleteTodo(item.id);
    });

    return parsedListItem.body.firstChild as HTMLLIElement;
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
      todosMessage.textContent = 'Please add your todo items above.';
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

  const updateTodoDescription = async (id: string, newText: string) => {
    await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: newText,
        status: todos.find(todo => todo.id === id)?.status,
      }),
    });
    fetchTodos();
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

  const deleteTodo = async (id: string) => {
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

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.querySelector<HTMLInputElement>('#new-todo')!;
    const todoText = input.value.trim();
    if (todoText !== '') {
      addTodo(todoText);
      input.value = '';
    }
  });
});
