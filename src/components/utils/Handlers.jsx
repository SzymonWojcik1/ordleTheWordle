export const handleLetterSelect = (letter, selectedLetters, setSelectedLetters) => {
  setSelectedLetters([...selectedLetters, letter]);
};

export const handleReset = (setSelectedLetters, setReset, reset) => {
  setSelectedLetters([]);
  setReset(!reset);
};