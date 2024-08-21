import { addTodo, completeTodo, deleteTodo } from "./Redux/todoType.js";
import {
  addTodoAction,
  completeTodoAction,
  deleteTodoAction,
} from "./Redux/actionCreator.js";

//! for defiend functions on ShowAllTodo
window.completeTodoClick = completeTodoClick;
window.deleteTodoClick = deleteTodoClick;

const todoInput = document.querySelector(".todo-input");
const addTodoBtn = document.querySelector(".todo-button");
const todoItems = document.querySelector(".todo-list");
const filterSelector = document.querySelector(".filter-todo");

function reducer(state = [], action) {
  switch (action.type) {
    case addTodo: {
      const newState = [...state];

      const newTodo = {
        id: crypto.randomUUID(),
        title: action.title,
        isComplete: false,
      };

      newState.push(newTodo);

      return newState;
    }
    case completeTodo: {
      const newState = state.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            isComplete: !item.isComplete,
          };
        }
        return item;
      });

      return newState;
    }
    case deleteTodo: {
      const newState = state.filter((item) => item.id !== action.id);
      return newState;
    }
    default: {
      return state;
    }
  }
}
const store = Redux.createStore(reducer);

addTodoBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const todoTitle = todoInput.value;
  store.dispatch(addTodoAction(todoTitle));

  const todoState = store.getState();
  ShowTodo(todoState);

  todoInput.value = "";
});

filterSelector.addEventListener("click", (e) => {
  const selectedValue = e.target.value;
  const todoState = store.getState();

  switch (selectedValue) {
    case "completed": {
      const filteredState = todoState.filter((item) => item.isComplete);
      ShowTodo(filteredState);
      break;
    }
    case "incomplete": {
      const filteredState = todoState.filter(
        (item) => item.isComplete === false
      );
      ShowTodo(filteredState);
      break;
    }
    default: {
      ShowTodo(todoState);
      break;
    }
  }
});

function ShowTodo(todoState) {
  todoItems.innerHTML = "";
  for (const { id, title, isComplete } of todoState) {
    todoItems.insertAdjacentHTML(
      "beforeend",
      `
      <div class="todo ${isComplete ? "completed" : ""}">
        <li class="todo-item">${title}</li>
        <button class="complete-btn" onclick=completeTodoClick("${id}")>
          <i class="fas fa-check-circle"></i>
        </button>
        <button class="trash-btn" onclick=deleteTodoClick("${id}")>
          <i class="fas fa-trash"></i>
        </button>
      </div>
      `
    );
  }
}

function completeTodoClick(id) {
  store.dispatch(completeTodoAction(id));
  const todoState = store.getState();
  filterSelector.value = "all";
  ShowTodo(todoState);
}

function deleteTodoClick(id) {
  store.dispatch(deleteTodoAction(id));
  const todoState = store.getState();
  ShowTodo(todoState);
}
