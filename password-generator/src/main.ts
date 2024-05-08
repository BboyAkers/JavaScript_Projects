import './style.css'

const uppercaseLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const lowercaseLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '{', '}', '[', ']', '|', ':', ';', '<', '>', ',', '.', '?', '/'];

type FormDataTypes = {
  passwordLength: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

const generatePassword = (formData:FormDataTypes) => {
  let password = "";
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#passwordForm')! as HTMLFormElement;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const passwordLength = (form.querySelector('#passwordLength') as HTMLInputElement).value;
    const includeUppercase = (form.querySelector('#includeUppercase') as HTMLInputElement).checked;
    const includeLowercase = (form.querySelector('#includeLowercase') as HTMLInputElement).checked;
    const includeNumbers = (form.querySelector('#includeNumbers') as HTMLInputElement).checked;
    const includeSymbols = (form.querySelector('#includeSymbols') as HTMLInputElement).checked;
    const formData: FormDataTypes = {
      passwordLength: parseInt(passwordLength),
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols
    }
    generatePassword(formData)
    console.log('formData', formData);
  });
});
