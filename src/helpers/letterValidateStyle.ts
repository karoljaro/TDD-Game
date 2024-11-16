import type { LetterScore_TYPE } from "@/utils/wrdl";

export const letterValidationStyle = (letterState: LetterScore_TYPE) => {
    if (letterState === 'C') {
        return 'bg-green-700';
    } else if (letterState === 'A') {
        return 'bg-yellow-500';
    } else {
        return 'bg-primary';
    }
}