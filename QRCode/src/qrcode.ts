const textToBinaryString = (text:string) => {
  const utf8Arr = new TextEncoder().encode(text);
  return [...utf8Arr].map(c => c.toString(2).padStart(8, '0')).join('')
};

const isNumeric = (text: string) => {
  const numericRegex = new RegExp(/^\d+$/)
  return numericRegex.test(text);
}
const isAlphaNumeric = (text:string) => {
  const alphaNumericCharactersRegex = new RegExp(/^[a-zA-Z0-9$%*+\-.\/: ]+$/)
  return alphaNumericCharactersRegex.test(text);
}

const isByteMode = (text: string) => {
  // ISO-8859-1 (Western Europe) character range in Unicode
  const ISO88591Regex = new RegExp(/^[\u0000-\u00FF]+$/);
  return ISO88591Regex.test(text);
}

const isKanji = (text: string) => {
  // Kanji character range in Unicode
  const kanjiRegex = /[\u4E00-\u9FFF]/;
  return kanjiRegex.test(text);
}

const modeDetector = (text: string) => {
  let selectedMode: string;
  switch (true) {
    case isNumeric(text):
      return selectedMode = '0001';
    case isAlphaNumeric(text):
      return selectedMode = '0010';
    case isByteMode(text):
      return selectedMode = '0100';
    case isKanji(text):
      return selectedMode = '1000';
    default:
      return selectedMode = '0000';
  }
}

export { textToBinaryString, isNumeric, isAlphaNumeric, isByteMode, isKanji, modeDetector };


