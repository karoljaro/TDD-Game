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

  it('matches letters only once', () => {
    expect(Wrdl.scoreGuess('cczy', 'abcd')).toEqual(['A', 'I', 'I', 'I']);
  })

  it('matches correct letters first', () => {
    expect(Wrdl.scoreGuess('zdyd', 'abcd')).toEqual(['I', 'I', 'I', 'C']);
  })

  it.each([
    // no duplications in answer, duplications in guess
    ['zyxx', 'abcd', 'IIII'],
    ['cczy', 'abcd', 'AIII'],
    ['aazy', 'abcd', 'CIII'],
    ['zdyd', 'abcd', 'IIIC'],
    // duplications in answer, duplications in guess
    ['zzyx', 'abcb', 'IIII'],
    ['bzby', 'abcb', 'AIAI'],
    ['zbby', 'abcb', 'ICAI'],
    ['zybb', 'abcb', 'IIAC'],
    ['zbyb', 'abcb', 'ICIC'],
    // duplications in answer, no dupe in guess
    ['zbxy', 'abcb', 'ICII'],
    ['bzyx', 'abcb', 'AIII']
  ])('guess: %s, answer: %s, result: %s', (guess, answer, result) => {
    expect(Wrdl.scoreGuess(guess, answer)).toEqual(result.split(''));
  });
});
