import { LetterValidationState } from '../types/enums';

/**
 * Validate letters of word 
 * @param guess - The word or letters that the player enters.
 * @param answer - The right word.
 * @returns {string[]} Return Array sting where we will have a letter state of word
 */

export const scoreGuess = (guess: string, answer: string): string[] => {
  
  const score: string[] = [];

  for (let letterIndex = 0; letterIndex < guess.length; letterIndex++) {
    if (guess[letterIndex] === answer[letterIndex]) {
      score[letterIndex] = LetterValidationState.Correct;

    } else if (answer.includes(guess[letterIndex])) {
      score[letterIndex] = LetterValidationState.Almost;

    } else {
      score[letterIndex] = LetterValidationState.Incorrect;
      
    }
  }

  return score;
};
