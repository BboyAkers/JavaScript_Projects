import './style.css'
import Payment from 'payment';

document.addEventListener('DOMContentLoaded', () => {
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
});
