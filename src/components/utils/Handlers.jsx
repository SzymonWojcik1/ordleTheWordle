export const handleLetterSelect = (letter, selectedLetters, setSelectedLetters, dailyWord, setHasWon) => {
  setSelectedLetters(prevLetters => {
    const newLetters = [...prevLetters, letter];
    console.log(`Selected letters: ${newLetters.join('')}`);
    console.log(dailyWord)
    if (newLetters.join('') === dailyWord[0]) {
      setHasWon(true);
    }
    return newLetters;
  });
};

export const handleReset = (setSelectedLetters, setReset, reset) => {
  setSelectedLetters([]);
  setReset(!reset);
};