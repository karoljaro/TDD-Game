import { LetterValidationState } from "@/types/enums";

export type LetterScore_TYPE = Exclude<`${LetterValidationState}`, `${LetterValidationState.Empty}`>;
export type GuessScore = LetterScore_TYPE[];

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

    const answerIdx = answerLetters.findIndex(
      (char) => char === guessLetters[letterIndex],
    );

    if (answerIdx > -1) {
      score[letterIndex] = LetterValidationState.Almost;

      answerLetters[answerIdx] = LetterValidationState.Empty;
    } else {
      score[letterIndex] = LetterValidationState.Incorrect;
    }
  }

  return score;
};
