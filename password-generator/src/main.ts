import './style.css';

const uppercaseLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const lowercaseLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '{', '}', '[', ']', '|', ':', ';', '<', '>', ',', '.', '?', '/'];
const STRENGTH_BAR_CLASSES = {
  4: ['bg-green','border-green'],
  3: ['bg-yellow','border-yellow'],
  2: ['bg-orange','border-orange'],
  1: ['bg-red','border-red'],
  0: ['bg-red','border-red'],
}
const STRENGTH_MESSAGES = [
  "TOO WEAK!",
  "TOO WEAK!",
  "WEAK",
  "MEDIUM",
  "STRONG",
]
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
    const randomNumber = Math.floor(Math.random() * passwordCharacters.length)
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
  const copyPassword = document.querySelector('#copyPassword') as HTMLDivElement;
  const characterLength = document.querySelector('#characterLength')! as HTMLInputElement;
  const passwordLength = document.querySelector('#passwordLength') as HTMLInputElement;
  const generatedPasswordInput = document.querySelector('#generatedPassword') as HTMLInputElement;
  const passwordStrengthBars = document.querySelectorAll('.password-strength') as NodeListOf<HTMLDivElement>;
  const strengthText = document.querySelector('#strengthText') as HTMLDivElement;

  copyPassword.addEventListener('click', () => {
    navigator.clipboard.writeText(generatedPasswordInput.value);
  })

  const updatePasswordStrengthBars = (passwordStrength: number) => {
    // Reset classes
    for (let i = 0; i < passwordStrengthBars.length; i++) {
      passwordStrengthBars[i].className = '';
      passwordStrengthBars[i].classList.value = 'inline-block w-[10px] align-middle border-2 border-white h-7';
    }

    strengthText.textContent = STRENGTH_MESSAGES[passwordStrength] ?? STRENGTH_MESSAGES[0];
    for (const [i, bar] of passwordStrengthBars.entries()) {
      // dunno why you're using both className and classList here. Should just be able to do this
      bar.className = 'inline-block w-[10px] align-middle border-2 border-white h-7';
      if (i <= passwordStrength) {
        bar.classList.add(...(STRENGTH_BAR_CLASSES[passwordStrength] ?? STRENGTH_BAR_CLASSES[0])) 
      }
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
