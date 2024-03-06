const textToBinaryString = (text:string) => {
  const utf8Arr = new TextEncoder().encode(text);
  return [...utf8Arr].map(c => c.toString(2).padStart(8, '0')).join('')
};

const isNumeric = (text: string) => {
  const numericRegex = new RegExp(/^\d+$/)
  return numericRegex.test(text);
}
const isAlphaNumeric = (text:string) => {
  const alphaNumericCharactersRegex = new RegExp(/^[a-zA-Z0-9$%*+\-.\/:]+$/)
  return alphaNumericCharactersRegex.test(text);
}

export { textToBinaryString, isNumeric, isAlphaNumeric };


