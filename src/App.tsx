import { Guess } from './components/GuessComponent';
import { useWrdl } from './hooks/useWrdl';

function App() {
    const [game, guess, valid] = useWrdl();

    console.log(valid)

    const emptyRows = Array(game.guessesRemaining - 1).fill(0).map((_, idx) => 
        <Guess key={idx} word={''} active={false} />
    );

    return (
        <div className={'flex gap-3 flex-col min-h-screen w-full items-center justify-center bg-primary'}>
            {game.guesses.map((guess, idx) => 
                <Guess key={idx + guess} word={guess} score={game.scores[idx]} />
            )}
            <Guess word={guess} valid={valid} />
            {emptyRows}
        </div>
    );
}

export default App;
