/**
 * Enum for letter state values.
 * @readonly
 * @enum {string} - Letter state. Can be one of the following values:
 * - `LetterValidationState.Correct` ("C"): Letter is in the word and in the correct spot.
 * - `LetterValidationState.Incorrect` ("I"): Letter is not in the word in any spot.
 * - `LetterValidationState.Almost` ("A"): Letter is in the word but in the wrong spot.
 * - `LetterValidationState.Empty` ("-"): The letter in the word was guessed in the right place and the algorithm did not take it into account later.
 */
export enum LetterValidationState {
  /**
   * Returns the mark for a letter that is in a word and in correct position.
   * @type {string}
   */
  Correct = 'C',

  /**
   * Returns the mark for a letter that is not in a word and is not in any place in the answer word.
   * @type {string}
   */
  Incorrect = 'I',

  /**
   * Returns the mark for a letter that is in a word but in an incorrect position
   * @type {string}
   */
  Almost = 'A',

  /**
   * Returns a grade for a letter that is correct in a word and replaces the correct letter with that character to protect against errors
   * @type {string}
   */
  Empty = '-'
}
