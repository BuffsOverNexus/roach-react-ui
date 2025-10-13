import { describe, test, expect } from '@jest/globals';
import { formatCount, capitalize, truncate, isEmpty } from './utils';

describe('Utils', () => {
  describe('formatCount', () => {
    test('returns singular form for count of 1', () => {
      expect(formatCount(1, 'item')).toBe('1 item');
      expect(formatCount(1, 'person')).toBe('1 person');
    });

    test('returns plural form for count of 0', () => {
      expect(formatCount(0, 'item')).toBe('0 items');
      expect(formatCount(0, 'person')).toBe('0 persons');
    });

    test('returns plural form for count greater than 1', () => {
      expect(formatCount(2, 'item')).toBe('2 items');
      expect(formatCount(5, 'person')).toBe('5 persons');
      expect(formatCount(100, 'item')).toBe('100 items');
    });

    test('uses custom plural form when provided', () => {
      expect(formatCount(0, 'child', 'children')).toBe('0 children');
      expect(formatCount(1, 'child', 'children')).toBe('1 child');
      expect(formatCount(2, 'child', 'children')).toBe('2 children');
    });

    test('handles negative numbers', () => {
      expect(formatCount(-1, 'item')).toBe('-1 items');
      expect(formatCount(-5, 'person')).toBe('-5 persons');
    });
  });

  describe('capitalize', () => {
    test('capitalizes first letter of lowercase string', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('world')).toBe('World');
    });

    test('capitalizes first letter and lowercases the rest', () => {
      expect(capitalize('hELLO')).toBe('Hello');
      expect(capitalize('WORLD')).toBe('World');
      expect(capitalize('jAvAsCrIpT')).toBe('Javascript');
    });

    test('handles single character strings', () => {
      expect(capitalize('a')).toBe('A');
      expect(capitalize('Z')).toBe('Z');
    });

    test('handles empty strings', () => {
      expect(capitalize('')).toBe('');
    });

    test('handles strings with numbers and special characters', () => {
      expect(capitalize('123abc')).toBe('123abc');
      expect(capitalize('!hello')).toBe('!hello');
    });
  });

  describe('truncate', () => {
    test('returns original string if shorter than max length', () => {
      expect(truncate('hello', 10)).toBe('hello');
      expect(truncate('short', 20)).toBe('short');
    });

    test('returns original string if equal to max length', () => {
      expect(truncate('hello', 5)).toBe('hello');
    });

    test('truncates string and adds ellipsis if longer than max length', () => {
      expect(truncate('hello world', 8)).toBe('hello...');
      expect(truncate('this is a very long string', 10)).toBe('this is...');
    });

    test('handles edge case where max length is very small', () => {
      expect(truncate('hello', 3)).toBe('...');
      expect(truncate('hi', 3)).toBe('hi');
    });

    test('handles empty strings', () => {
      expect(truncate('', 5)).toBe('');
    });
  });

  describe('isEmpty', () => {
    test('returns true for null and undefined', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
    });

    test('returns true for empty string', () => {
      expect(isEmpty('')).toBe(true);
    });

    test('returns false for non-empty string', () => {
      expect(isEmpty('hello')).toBe(false);
      expect(isEmpty(' ')).toBe(false); // space is not empty
    });

    test('returns true for empty array', () => {
      expect(isEmpty([])).toBe(true);
    });

    test('returns false for non-empty array', () => {
      expect(isEmpty([1])).toBe(false);
      expect(isEmpty([1, 2, 3])).toBe(false);
    });

    test('returns true for empty object', () => {
      expect(isEmpty({})).toBe(true);
    });

    test('returns false for non-empty object', () => {
      expect(isEmpty({ key: 'value' })).toBe(false);
      expect(isEmpty({ a: 1, b: 2 })).toBe(false);
    });

    test('returns false for numbers', () => {
      expect(isEmpty(0)).toBe(false);
      expect(isEmpty(1)).toBe(false);
      expect(isEmpty(-1)).toBe(false);
    });

    test('returns false for booleans', () => {
      expect(isEmpty(true)).toBe(false);
      expect(isEmpty(false)).toBe(false);
    });
  });
});