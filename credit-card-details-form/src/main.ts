import './style.css'
document.addEventListener('DOMContentLoaded', () => {
  const cardNumber = document.querySelector('#card-number') as HTMLInputElement;
  const cardHolder = document.querySelector('#card-holder') as HTMLInputElement;
  const cardExpirationMonth = document.querySelector('#card-expiration-month') as HTMLInputElement;
  const cardExpirationYear = document.querySelector('#card-expiration-year') as HTMLInputElement;
  const cardCvv = document.querySelector('#card-cvv') as HTMLInputElement;

  const cardNumberDisplay = document.querySelector('#card-number-display') as HTMLParagraphElement;
  const cardHolderDisplay = document.querySelector('#card-holder-display') as HTMLParagraphElement;
  const cardExpirationMonthDisplay = document.querySelector('#card-month-display') as HTMLSpanElement;
  const cardExpirationYearDisplay = document.querySelector('#card-year-display') as HTMLSpanElement;
  const cardCvvDisplay = document.querySelector('#card-cvv-display') as HTMLParagraphElement;

  const reactiveInputToDisplay = (input: HTMLInputElement, display: HTMLElement) => {
    input.addEventListener('keyup', () => {
      if (input.id === 'card-number') {
        input.value = formatCreditCardNumber(input.value);
      }
      if(input.value.length > 0 ){
        display.innerHTML = input.value;
      }
    });
  }

  const formatCreditCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
        return parts.join(' ');
    } else {
        return value;
    }
  };

  reactiveInputToDisplay(cardNumber, cardNumberDisplay);
  reactiveInputToDisplay(cardHolder, cardHolderDisplay);
  reactiveInputToDisplay(cardExpirationMonth, cardExpirationMonthDisplay);
  reactiveInputToDisplay(cardExpirationYear, cardExpirationYearDisplay);
  reactiveInputToDisplay(cardCvv, cardCvvDisplay);
});
