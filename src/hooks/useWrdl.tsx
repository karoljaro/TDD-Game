import { useCallback, useEffect, useState } from 'react';
import * as Wrdl from '@/utils/wrdl';
import { isLetter } from '@/helpers/isLetter';

export const useWrdl = () => {
    const [game, setGame] = useState(Wrdl.createGame());
    const [guess, _setGuess] = useState('');
    const [valid, _setValid] = useState(true);

    const setGuess = useCallback(
        (guess: string) => {
            _setGuess(guess);
            _setValid(guess.length !== game.maxWordLength || Wrdl.validateGuess(guess, game));
        },
        [game],
    );

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            const char: KeyboardEvent['key'] = e.key.toLowerCase();

            switch (true) {
                case char === 'enter':
                    if (Wrdl.validateGuess(guess, game)) {
                        setGame(Wrdl.makeGuess(guess, game));
                        setGuess('');
                    } else {
                        setGuess(guess);
                    }
                    return;
                case char === 'backspace':
                    setGuess(guess.slice(0, -1));
                    return;
                case isLetter(char) && guess.length < game.maxWordLength:
                    setGuess(guess + char);
                    return;
            }
        },
        [game, guess, setGuess],
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return [game, guess, valid] as const;
};
