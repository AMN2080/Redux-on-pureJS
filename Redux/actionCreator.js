import { addTodo, deleteTodo, completeTodo } from "./todoType.js";

function addTodoAction(title) {
  return {
    type: addTodo,
    title,
  };
}
function completeTodoAction(id) {
  return {
    type: completeTodo,
    id,
  };
}
function deleteTodoAction(id) {
  return {
    type: deleteTodo,
    id,
  };
}

export { addTodoAction, deleteTodoAction, completeTodoAction };
