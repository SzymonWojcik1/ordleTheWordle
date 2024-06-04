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
  const [timeUntilNextWord, setTimeUntilNextWord] = useState('');

  useEffect(() => {
    if (dailyWord) {
      const dailyWordShuffle = ShuffleWord({ words: dailyWord });
      setShuffledWord(dailyWordShuffle[0]);
    }
  }, [dailyWord]);

  useEffect(() => {
    if (selectedLetters.join('') === dailyWord) {
      setHasWon(true);
    }
  }, [selectedLetters, dailyWord]);

  useEffect(() => {
    let timerInterval;
    if (hasWon) {
      const updateTimer = () => {
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);
        const timeDifference = midnight - now;
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        setTimeUntilNextWord(`${hours}h ${minutes}m ${seconds}s`);
      };
      updateTimer(); // Update immediately
      timerInterval = setInterval(updateTimer, 1000); // Update every second
    }
    return () => clearInterval(timerInterval);
  }, [hasWon]);

  if (!shuffledWord) {
    return <div><h2>Loading...</h2></div>;
  }

  return (
    <>
      <h3>Word: {dailyWord}</h3>
      <WordButtons word={shuffledWord} onLetterClick={(letter) => handleLetterSelect(letter, selectedLetters, setSelectedLetters, dailyWord, setHasWon)} reset={reset} />
      <SelectedLetters letters={selectedLetters} />
      {!hasWon && <ResetButton onReset={() => handleReset(setSelectedLetters, setReset, reset)} />}
      {hasWon && <h2>Congratulations! You've won!</h2>}
      {hasWon && <p>Time until next word: {timeUntilNextWord}</p>}
    </>
  );
};

export default DailyWord;
