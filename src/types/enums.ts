/**
 * Enum for letter state values.
 * @readonly
 * @enum {string} - Letter state. Can be one of the following values:
 * - `LetterValidationState.Correct` ("C"): Letter is in the word and in the correct spot.
 * - `LetterValidationState.Incorrect` ("I"): Letter is not in the word in any spot.
 * - `LetterValidationState.Almost` ("A"): Letter is in the word but in the wrong spot.
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
}
