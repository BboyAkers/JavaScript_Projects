import { describe, expect, test } from 'vitest'
import { isAlphaNumeric, isNumeric } from './qrcode'

test('testing strings against isNumeric', () =>{
  expect(isNumeric('abc')).toBe(false);
  expect(isNumeric('123')).toBe(true);
  expect(isNumeric('testing 2345')).toBe(false);
  expect(isNumeric(' ')).toBe(false);
  expect(isNumeric('123testing')).toBe(false);
})

test('testing various string against isAlphaNumeric', () => {
  expect(isAlphaNumeric('abc123')).toBe(true);
  expect(isAlphaNumeric('abc')).toBe(true);
  expect(isAlphaNumeric('$abc123')).toBe(true);
  expect(isAlphaNumeric('!abc#@#123)')).toBe(false);
  expect(isAlphaNumeric('ab*c123%')).toBe(true);
})

