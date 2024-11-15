import { LetterValidationState } from '@/types/enums';

export type LetterScore_TYPE = Exclude<`${LetterValidationState}`, `${LetterValidationState.Empty}`>;
export type GuessScore = LetterScore_TYPE[];

export type Game = {
  answer: string;
  hardMode: boolean;
  guesses: string[];
  scores: GuessScore[];
  guessesRemaining: number;
  dictionary: string[];
  maxWordLength: number;
};

export const createGame = (dictionary: string[], answer: string, hardMode = false): Game => {
  return {
    answer,
    hardMode,
    guesses: [],
    scores: [],
    guessesRemaining: 6,
    dictionary,
    maxWordLength: 4,
  };
};

/**
 * Validate letters of word
 * @param guess - The word or letters that the player enters.
 * @param answer - The right word.
 * @returns {GuessScore} Return Array sting where we will have a letter state of word
 */

export const scoreGuess = (guess: string, answer: string): GuessScore => {
  const answerLetters = answer.split('');
  const guessLetters = guess.split('');

  const score: GuessScore = [];

  for (let letterIndex = 0; letterIndex < guessLetters['length']; letterIndex++) {
    if (guessLetters[letterIndex] === answerLetters[letterIndex]) {
      score[letterIndex] = LetterValidationState.Correct;
      answerLetters[letterIndex] = LetterValidationState.Empty;
      guessLetters[letterIndex] = LetterValidationState.Empty;
    }
  }

  for (let letterIndex = 0; letterIndex < guessLetters['length']; letterIndex++) {
    if (guessLetters[letterIndex] === LetterValidationState.Empty) continue;

    const answerIdx = answerLetters.findIndex((char) => char === guessLetters[letterIndex]);

    if (answerIdx > -1) {
      score[letterIndex] = LetterValidationState.Almost;

      answerLetters[answerIdx] = LetterValidationState.Empty;
    } else {
      score[letterIndex] = LetterValidationState.Incorrect;
    }
  }

  return score;
};

export const validateGuess = (guess: string, game: Game) => {
  if (!game.dictionary.includes(guess)) return false;
  if (game.guesses.includes(guess)) return false;

  if (game.guesses.length && game.hardMode) {
    const lastGuess = game.guesses[game.guesses.length - 1];
    const lastScore = game.scores[game.scores.length - 1];

    for (let i = 0; i < guess.length; i++) {
      if (lastScore[i] === LetterValidationState.Correct && lastGuess[i] !== guess[i]) {
        return false;
      }

      if (lastScore[i] === LetterValidationState.Almost && !guess.includes(lastGuess[i])) {
        return false;
      }
    }
  }

  return true;
};

export const makeGuess = (guess: string, game: Game) => {
  return {
    ...game,
    guesses: game.guesses.concat([guess]),
    scores: game.scores.concat([scoreGuess(guess, game.answer)]),
    guessesRemaining: guess === game.answer ? 0 : game.guessesRemaining === 0 ? 0 : game.guessesRemaining - 1,
  };
};
