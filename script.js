import {
  counterIncrease,
  counterReset,
  counterDecrease,
} from "./Redux/counterType";

import {
  increaseAction,
  resetAction,
  decreaseAction,
} from "./Redux/actionCreator";

const increaseBtn = document.querySelector(".increase");
const resetBtn = document.querySelector(".reset");
const decreaseBtn = document.querySelector(".decrease");
const showNumber = document.querySelector("#number");

//! Redux Reducer
function counterReducer(state = 0, action) {
  switch (action.type) {
    case counterIncrease: {
      return state + 1;
    }
    case counterReset: {
      return 0;
    }
    case counterDecrease: {
      return state - 1;
    }
    default: {
      return state;
    }
  }
}

//! Redux Store
const store = Redux.createStore(counterReducer);

//! Event Handlers
increaseBtn.addEventListener("click", () => {
  store.dispatch(increaseAction);
  showNumber.textContent = store.getState();
});

resetBtn.addEventListener("click", () => {
  store.dispatch(resetAction);
  showNumber.textContent = store.getState();
});

decreaseBtn.addEventListener("click", () => {
  store.dispatch(decreaseAction);
  showNumber.textContent = store.getState();
});
