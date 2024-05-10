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
  const { passwordLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols } = formData;
  let passwordCharacters: string[] = [];
  let createdPassword: string = '';
  if (includeUppercase) {
    passwordCharacters = passwordCharacters.concat(uppercaseLetters);
  }
  if (includeLowercase) {
    passwordCharacters = passwordCharacters.concat(lowercaseLetters);
  }
  if (includeNumbers) {
    passwordCharacters = passwordCharacters.concat(numbers);
  }
  if (includeSymbols) {
    passwordCharacters = passwordCharacters.concat(symbols);
  }
  for (let index = 0; index < passwordLength; index++) {
    const randomNumber = Math.round(Math.random() * passwordCharacters.length - 1)
    createdPassword += passwordCharacters[randomNumber];
  }
  return createdPassword;
}

const passwordStrengthChecker = (password:string) => {
  let passwordStrength = 0;

  if (password.match(/[a-z]+/)) {
    passwordStrength += 1;
  }
  
  if (password.match(/[A-Z]+/)) {
      passwordStrength += 1;
  }

  if (password.match(/[0-9]+/)) {
      passwordStrength += 1;
  }

  if (password.match(/[$@#&!]+/)) {
      passwordStrength += 1;
  }

  if(password.length < 8 ) {
    passwordStrength -= 1;
  }
  return passwordStrength;
}

document.addEventListener('DOMContentLoaded', () => {
  const characterLength = document.querySelector('#characterLength')! as HTMLInputElement;
  const passwordLength = document.querySelector('#passwordLength') as HTMLInputElement;
  const generatedPasswordInput = document.querySelector('#generatedPassword') as HTMLInputElement;
  const passwordStrengthBars = document.querySelectorAll('.password-strength') as NodeListOf<HTMLDivElement>;
  const strengthText = document.querySelector('#strengthText') as HTMLDivElement

  const updatePasswordStrengthBars = (passwordStrength: number) => {
    // Reset classes
    for (let i = 0; i < passwordStrengthBars.length; i++) {
      passwordStrengthBars[i].className = '';
      passwordStrengthBars[i].classList = 'inline-block w-[10px] align-middle border-2 border-white h-7';
    }
   switch (passwordStrength) {
    case 1:
      strengthText.innerText = 'TOO WEAK!';
      passwordStrengthBars[0].classList.add('bg-red', 'border-red');
      break;

    case 2:
      strengthText.innerText = 'WEAK';
      passwordStrengthBars[0].classList.add('bg-orange', 'border-orange');
      passwordStrengthBars[1].classList.add('bg-orange', 'border-orange');
      break;
    
    case 3:
      strengthText.innerText = 'MEDIUM';
      passwordStrengthBars[0].classList.add('bg-yellow', 'border-yellow');
      passwordStrengthBars[1].classList.add('bg-yellow', 'border-yellow');
      passwordStrengthBars[2].classList.add('bg-yellow', 'border-yellow');
      break;
    
    case 4:
      strengthText.innerText = 'STRONG';
      passwordStrengthBars[0].classList.add('bg-green', 'border-green');
      passwordStrengthBars[1].classList.add('bg-green', 'border-green');
      passwordStrengthBars[2].classList.add('bg-green', 'border-green');
      passwordStrengthBars[3].classList.add('bg-green', 'border-green');
      break;

    default:
      strengthText.innerText = 'TOO WEAK!';
      passwordStrengthBars[0].classList.add('bg-red', 'border-red');
      break;
   }
  }

  passwordLength.addEventListener('change', (event) => {
    characterLength.innerText = (event.target as HTMLInputElement).value;
  });

  const form = document.querySelector('#passwordForm')! as HTMLFormElement;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const passwordLength = (form.querySelector('#passwordLength') as HTMLInputElement).value;
    const includeUppercase = (form.querySelector('#includeUppercase') as HTMLInputElement).checked;
    const includeLowercase = (form.querySelector('#includeLowercase') as HTMLInputElement).checked;
    const includeNumbers = (form.querySelector('#includeNumbers') as HTMLInputElement).checked;
    const includeSymbols = (form.querySelector('#includeSymbols') as HTMLInputElement).checked;
    if(!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols){
      
      return;
    }
    const formData: FormDataTypes = {
      passwordLength: parseInt(passwordLength),
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols
    };
    const generatedPassword = generatePassword(formData);
    const passwordStrength = passwordStrengthChecker(generatedPassword);
    generatedPasswordInput.value = generatedPassword;
    updatePasswordStrengthBars(passwordStrength)
  });
});
