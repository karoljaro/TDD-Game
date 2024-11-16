export const isLetter = (char: KeyboardEvent['key']) => {
    return /^[a-z]$/.test(char);
}