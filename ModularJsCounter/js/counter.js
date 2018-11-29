import counterApi from "./state";

const incrementState = document.querySelector('.incrementState');
const decrementState = document.querySelector('.decrementState');

incrementState.addEventListener('click', (e) => {
  counterApi.increment();
});

decrementState.addEventListener('click', (e) => {
  counterApi.decrement();
})