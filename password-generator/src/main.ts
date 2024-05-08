import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#passwordForm')! as HTMLFormElement;

  const formElements = Array.from(form.elements);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(formElements)
  });
});
