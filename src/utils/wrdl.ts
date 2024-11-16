import { getRandomNumber } from '@/helpers/randomNumber';
import { words } from '@/models/exampleOfwords';
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

export const getWord = () => words[getRandomNumber(0, words.length - 1)];

export const createGame = (dictionary: string[] = words, answer: string = getWord(), hardMode = false): Game => {
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

export const validateGuess = (guess: string, game: Game): boolean => {
    if (!game.dictionary.includes(guess)) return false;
    if (game.guesses.includes(guess)) return false;

    const lastGuess = game.guesses[game.guesses.length - 1];
    const lastScore = game.scores[game.scores.length - 1];

    if (game.hardMode && lastScore) {
        for (let i = 0; i < lastScore.length; i++) {
            if (lastScore[i] === LetterValidationState.Correct && guess[i] !== lastGuess[i]) {
                return false;
            }
            if (lastScore[i] === LetterValidationState.Almost && !guess.includes(lastGuess[i])) {
                return false;
            }
        }
    }

    return true;
};

export const makeGuess = (guess: string, game: Game): Game => {
    if (!validateGuess(guess, game)) {
        throw new Error(guess + ' is an invalid guess');
    }

    return {
        ...game,
        guessesRemaining: game.answer === guess ? 0 : game.guessesRemaining === 0 ? 0 : game.guessesRemaining - 1,
        guesses: game.guesses.concat([guess]),
        scores: game.scores.concat([scoreGuess(guess, game.answer)]),
    };
};
