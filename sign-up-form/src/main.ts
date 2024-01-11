import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const signUpForm = document.querySelector('#signUpForm') as HTMLFormElement;

  const firstNameErrorIcon = document.querySelector('#firstNameErrorIcon') as HTMLDivElement;
  const lastNameErrorIcon = document.querySelector('#lastNameErrorIcon') as HTMLDivElement;
  const emailErrorIcon = document.querySelector('#emailErrorIcon') as HTMLDivElement;
  const passwordErrorIcon = document.querySelector('#passwordErrorIcon') as HTMLDivElement;

  const firstNameError = document.querySelector('#firstNameError') as HTMLSpanElement;
  const lastNameError = document.querySelector('#lastNameError') as HTMLSpanElement;
  const emailError = document.querySelector('#emailError') as HTMLSpanElement;
  const passwordError = document.querySelector('#passwordError') as HTMLSpanElement;

  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = signUpForm;

    firstName.classList.remove('ring-2', 'ring-orange');
    lastName.classList.remove('ring-2', 'ring-orange');
    email.classList.remove('ring-2', 'ring-orange');
    password.classList.remove('ring-2', 'ring-orange');

    firstNameError.classList.add('hidden');
    lastNameError.classList.add('hidden');
    emailError.classList.add('hidden');
    passwordError.classList.add('hidden');

    firstNameErrorIcon.classList.add('hidden');
    lastNameErrorIcon.classList.add('hidden');
    emailErrorIcon.classList.add('hidden');
    passwordErrorIcon.classList.add('hidden');    

    if(!firstName.value.length) {
      firstName.classList.add('ring-2', 'ring-orange');
      firstNameErrorIcon.classList.remove('hidden');
      firstNameError.classList.remove('hidden');
    }
    if(!lastName.value.length) {
      lastName.classList.add('ring-2', 'ring-orange');
      lastNameErrorIcon.classList.remove('hidden');
      lastNameError.classList.remove('hidden');
    }
    if(!email.value.length) {
      email.classList.add('ring-2', 'ring-orange', 'placeholder:text-orange');
      email.placeholder = 'email@example.com';
      emailErrorIcon.classList.remove('hidden');
      emailError.classList.remove('hidden');
    }
    if(!password.value.length) {
      password.classList.add('ring-2', 'ring-orange');
      passwordErrorIcon.classList.remove('hidden');
      passwordError.classList.remove('hidden');
    }
    
  });

});
