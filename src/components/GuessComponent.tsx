import { letterValidationStyle } from '@/helpers/letterValidateStyle';
import * as Wrld from '@/utils/wrdl';

export type GuessProps = {
    word: string;
    score?: Wrld.GuessScore;
    active?: boolean;
    valid?: boolean;
};

export const Guess = ({ word, score, active, valid = true }: GuessProps) => {
    return (
        <div className={`flex gap-2`}>
            {word.split('').map((letter, idx) => (
                <div
                    key={idx}
                    className={`${score && letterValidationStyle(score[idx])} ${!active && '!border-secondary'} ${!valid && 'text-red-700'} flex size-16 items-center justify-center rounded-md border-2 border-solid border-primary font-sans text-3xl uppercase text-white`}
                >
                    {letter}
                </div>
            ))}
        </div>
    );
};
