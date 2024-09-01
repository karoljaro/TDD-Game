import * as Wrdl from '../hooks/wrdl';
import { describe, expect, it } from 'vitest';

describe('scoreGuess', () => {
  it('identifies correct letters', () => {
    expect(Wrdl.scoreGuess('a', 'a')).toEqual(['C']);
  });

  it('identifies incorrect letters', () => {
    expect(Wrdl.scoreGuess('v', 'g')).toEqual(['I']);
  });

  it('identifies almost letters', () => {
    expect(Wrdl.scoreGuess('bx', 'ab')).toEqual(['A', 'I']);
  });

  it.each([
    ['zyxx', 'abcd', 'IIII'],
    ['abcd', 'aazy', 'CIII'],
  ])('guess: %s, answer: %s, result: %s', (guess, answer, result) => {
    expect(Wrdl.scoreGuess(guess, answer)).toEqual(result.split(''));
  });
});
