import { LetterValidationState } from '../types/enums';

/**
 * Validate letters of word 
 * @param guess - The word or letters that the player enters.
 * @param answer - The right word.
 * @returns {string[]} Return Array sting where we will have a letter state of word
 */

export const scoreGuess = (guess: string, answer: string): string[] => {
  const answerLetter = answer.split('');
  
  const score: string[] = [];

  for (let letterIndex = 0; letterIndex < guess['length']; letterIndex++) {
    if (guess[letterIndex] === answerLetter[letterIndex]) {
      score[letterIndex] = LetterValidationState.Correct;
      answerLetter[letterIndex] = '-';

    } else if (answerLetter.includes(guess[letterIndex])) {
      score[letterIndex] = LetterValidationState.Almost;

      const answerIdx = answerLetter.findIndex((char) => char === guess[letterIndex]);
      answerLetter[answerIdx] = '-';
      
    } else {
      score[letterIndex] = LetterValidationState.Incorrect;
    }
  }

  return score;
};
