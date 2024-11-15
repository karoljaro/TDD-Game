import * as Wrdl from '@/utils/wrdl';
import { beforeEach, describe, expect, it } from 'vitest';

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
  });

  it('matches correct letters first', () => {
    expect(Wrdl.scoreGuess('zdyd', 'abcd')).toEqual(['I', 'I', 'I', 'C']);
  });

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
    ['bzyx', 'abcb', 'AIII'],
  ])('guess: %s, answer: %s, result: %s', (guess, answer, result) => {
    expect(Wrdl.scoreGuess(guess, answer)).toEqual(result.split(''));
  });
});

describe('validationGuess', () => {
  let game: Wrdl.Game;

  beforeEach(() => {
    const dictionary = ['aaaa', 'aabb', 'bbaa', 'bbbb', 'bbba', 'aaab'];
    const answer = "aaab";

    game = Wrdl.createGame(dictionary, answer, false);
  });

  it('accept words that ARE in the dictionary', () => {
    expect(Wrdl.validateGuess("aaaa", game)).toEqual(true);
  });

  it('rejects words that ARE NOT in the dictionary', () => {
    expect(Wrdl.validateGuess("cccc", game)).toEqual(false);
  });

  it('rejects words that have already been guessed', () => {
    game = Wrdl.makeGuess("aaaa", game)
    expect(Wrdl.validateGuess("aaaa", game)).toEqual(false);
  });

  it("accepts words that do not use known CORRECT letters in EASY mode", () => {
    game = Wrdl.makeGuess("aabb", game)
    
    expect(Wrdl.validateGuess("bbaa", game)).toEqual(true);
  });

  it('rejects words that do not use known CORRECT letters in HARD mode', () => {
    game = Wrdl.makeGuess("aabb", game)
    game.hardMode = true;
    expect(Wrdl.validateGuess("bbaa", game)).toEqual(false);
  });

  it('rejects words that do not use known ALMOST letters in HARD mode', () => {
    game = Wrdl.makeGuess("bbba", game)
    game.hardMode = true;
    expect(Wrdl.validateGuess("aaaa", game)).toEqual(false);
  });
});
