import { useState, useEffect } from 'react';
import GetWord from './utils/GetWord';
import ShuffleWord from './utils/ShuffleWord';
import WordButtons from './utils/WordButtons';
import SelectedLetters from './utils/SelectedLetters';
import ResetButton from './utils/ResetButton';
import { handleLetterSelect, handleReset } from './utils/Handlers';

const DailyWord = () => {
  const dailyWord = GetWord({ type: 'daily' });
  const [shuffledWord, setShuffledWord] = useState(null);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [reset, setReset] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    if (dailyWord) {
      const dailyWordShuffle = ShuffleWord({ words: dailyWord });
      console.log("daily word : "+dailyWord)
      setShuffledWord(dailyWordShuffle[0]);
    }
  }, [dailyWord]);

  useEffect(() => {
    if (selectedLetters.join('') === dailyWord) {
      setHasWon(true);
    }
  }, [selectedLetters, dailyWord]);

  if (!shuffledWord) {
    return <div><h2>Loading...</h2></div>;
  }

  return (
    <>
      <h3>Word: {dailyWord}</h3>
      <WordButtons word={shuffledWord} onLetterClick={(letter) => handleLetterSelect(letter, selectedLetters, setSelectedLetters, dailyWord, setHasWon)} reset={reset} />      <SelectedLetters letters={selectedLetters} />
      <ResetButton onReset={() => handleReset(setSelectedLetters, setReset, reset)} />
      {hasWon && <h2>Congratulations! You've won!</h2>}
    </>
  );
};

export default DailyWord;