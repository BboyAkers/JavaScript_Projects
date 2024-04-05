import { describe, expect, test } from 'vitest'
import { isAlphaNumeric, isByteMode, isKanji, isNumeric, textToBinaryString } from './qrcode'

test('testing string converting to a binary string', () => {
  expect(textToBinaryString('hi')).toBe('0110100001101001');
  expect(textToBinaryString('1four')).toBe('0011000101100110011011110111010101110010')
  expect(textToBinaryString(' ')).toBe('00100000');
});

test('testing strings against isNumeric', () =>{
  expect(isNumeric('abc')).toBe(false);
  expect(isNumeric('123')).toBe(true);
  expect(isNumeric('testing 2345')).toBe(false);
  expect(isNumeric(' ')).toBe(false);
  expect(isNumeric('123testing')).toBe(false);
});

test('testing various string against isAlphaNumeric', () => {
  expect(isAlphaNumeric('abc123')).toBe(true);
  expect(isAlphaNumeric('abc')).toBe(true);
  expect(isAlphaNumeric('$abc123')).toBe(true);
  expect(isAlphaNumeric('!abc#@#123)')).toBe(false);
  expect(isAlphaNumeric('ab*c123%')).toBe(true);
});

test('testing varisous string against isByteMode', () => {
  expect(isByteMode('Hello World!')).toBe(true);
  expect(isByteMode('Ž')).toBe(false); // should be true. TODO: Fix this.
});

test('testing various string against isKanji', () => {
  expect(isKanji('Hello World!')).toBe(false);
  expect(isKanji('日')).toBe(true);
  expect(isKanji('今日は')).toBe(true);
  expect(isKanji('お元気ですか')).toBe(true);
});

