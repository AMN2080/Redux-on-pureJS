import { counterDecrease, counterReset, counterIncrease } from "./counterType";

function increaseAction() {
  return { type: counterIncrease };
}

function resetAction() {
  return { type: counterReset };
}

function decreaseAction() {
  return { type: counterDecrease };
}

export { increaseAction, resetAction, decreaseAction };
