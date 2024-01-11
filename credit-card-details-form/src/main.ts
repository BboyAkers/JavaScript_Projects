import './style.css'
import Payment from 'payment';

document.addEventListener('DOMContentLoaded', () => {

  const submitForm = document.querySelector('#credit-card-form') as HTMLFormElement;
  const cardNumber = document.querySelector('#card-number') as HTMLInputElement;
  const cardHolder = document.querySelector('#card-holder') as HTMLInputElement;
  const cardExpirationMonth = document.querySelector('#card-expiration-month') as HTMLInputElement;
  const cardExpirationYear = document.querySelector('#card-expiration-year') as HTMLInputElement;
  const cardCvv = document.querySelector('#card-cvv') as HTMLInputElement;

  const cardNumberDisplay = document.querySelector('#card-number-display') as HTMLSpanElement;
  const cardHolderDisplay = document.querySelector('#card-holder-display') as HTMLSpanElement;
  const cardExpirationMonthDisplay = document.querySelector('#card-month-display') as HTMLSpanElement;
  const cardExpirationYearDisplay = document.querySelector('#card-year-display') as HTMLSpanElement;
  const cardCvvDisplay = document.querySelector('#card-cvv-display') as HTMLSpanElement;
  const cardTypeDisplay = document.querySelector('#card-type-display') as HTMLSpanElement;

  const successfulSubmission = document.querySelector('#successful-submission') as HTMLDivElement;
  const continueButton = document.querySelector('#continue-button') as HTMLButtonElement;

  const getCardType = (cardNumber: string) => {
    return Payment.fns.cardType(cardNumber);
  };

  const reactiveInputToDisplay = (input: HTMLInputElement, display: HTMLElement) => {
    const defaultValue = display.textContent;
    input.addEventListener('input', () => {
      if(input.id === 'card-number') {
        cardTypeDisplay.textContent = getCardType(input.value) ?? '';
      }
        display.textContent = input.value || defaultValue;
    });
  };


  reactiveInputToDisplay(Payment.formatCardNumber(cardNumber), cardNumberDisplay);
  reactiveInputToDisplay(cardHolder, cardHolderDisplay);
  reactiveInputToDisplay(cardExpirationMonth, cardExpirationMonthDisplay);
  reactiveInputToDisplay(cardExpirationYear, cardExpirationYearDisplay);
  reactiveInputToDisplay(cardCvv, cardCvvDisplay);

  submitForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const cardNumberValue = cardNumber.value;
    const cardHolderValue = cardHolder.value;
    const cardExpirationMonthValue = cardExpirationMonth.value;
    const cardExpirationYearValue = cardExpirationYear.value;
    const cardCvvValue = cardCvv.value;

    console.log(cardNumberValue, cardHolderValue, cardExpirationMonthValue, cardExpirationYearValue, cardCvvValue);

    if(cardNumberValue && cardHolderValue && cardExpirationMonthValue && cardExpirationYearValue && cardCvvValue) {
      successfulSubmission.classList.remove('hidden');
      submitForm.classList.add('hidden');
    }
  });

  continueButton.addEventListener('click', () => {
    successfulSubmission.classList.add('hidden');
    submitForm.classList.remove('hidden');
    submitForm.reset();
    cardNumberDisplay.textContent = '0000 0000 0000 0000';
    cardHolderDisplay.textContent = 'JANE APPLESEED';
    cardExpirationMonthDisplay.textContent = 'MM';
    cardExpirationYearDisplay.textContent = 'YY';
    cardCvvDisplay.textContent = '000';
    cardTypeDisplay.textContent = '';
  });
});
