import { Guess } from './components/GuessComponent';
import { useWrdl } from './hooks/useWrdl';

function App() {
    const [game, guess, valid] = useWrdl();
    console.log(game.answer)

    const emptyRows = Array(Math.max(0, game.guessesRemaining - 1))
        .fill(0)
        .map((_, index) => <Guess key={index} word={''.padStart(game.maxWordLength)} />);

    return (
        <div className={'flex min-h-screen w-full flex-col items-center justify-center gap-3 bg-primary'}>
            {game.guesses.map((guess, idx) => (
                <Guess key={idx + guess} word={guess} score={game.scores[idx]} />
            ))}

            {game.guessesRemaining > 0 && <Guess key="guess" active valid={valid} word={guess.padEnd(game.maxWordLength)} />}
            {emptyRows}
            {game.guessesRemaining === 0 && (
                <div>
                    <hr />
                    <br />
                    <Guess word={game.answer} score={Array(4).fill("C")} />
                </div>
            )}
        </div>
    );
}

export default App;
