const counter = {
  _state: 0,
  increment() { counter._state++ },
  decrement() { counter._state-- },
  read() { return counter._state }
}

const { increment, decrement, read } = counter
const counterState = { increment, decrement, read }

export default counterState


