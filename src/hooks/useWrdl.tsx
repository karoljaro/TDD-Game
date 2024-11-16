import { useCallback, useEffect, useState } from 'react';
import * as Wrdl from '@/utils/wrdl';
import { isLetter } from '@/helpers/isLetter';

const words = ['tone', 'nice', 'cast', 'type'];

export const useWrdl = (): [Wrdl.Game, string, boolean] => {
    const [game, setGame] = useState(Wrdl.createGame(words, words[2], true));
    const [guess, _setGuess] = useState('');
    const [valid, _setValid] = useState(true);

    const setGuess = useCallback(
        (guess: string) => {
            _setGuess(guess);
            _setValid(guess.length !== game.maxWordLength || Wrdl.validateGuess(guess, game));
            console.log(Wrdl.validateGuess(guess, game))
        },
        [game]
    );

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            const char: KeyboardEvent['key'] = e.key.toLowerCase();

            if (char === 'enter') {
                if (valid) {
                    setGame(Wrdl.makeGuess(guess, game));
                    setGuess('');
                }
            } else if (char === 'backspace') {
                setGuess(guess.slice(0, -1));
                return
            } else if (isLetter(char) && guess.length < game.maxWordLength) {
                setGuess(guess + char);
                return;
            }
        },
        [game, guess, setGuess, valid],
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return [game, guess, valid];
};
