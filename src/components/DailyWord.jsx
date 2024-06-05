import { useState, useEffect } from 'react';
import GetWord from './utils/GetWord';
import ShuffleWord from './utils/ShuffleWord';
import WordButtons from './utils/WordButtons';
import SelectedLetters from './utils/SelectedLetters';
import ResetButton from './utils/ResetButton';
import { handleLetterSelect, handleReset } from './utils/Handlers';
import { calculateDifficultyFactor } from './utils/CalculateDifficultyFactor';

const DailyWord = () => {
  const dailyWord = GetWord({ type: 'daily' });
  const [shuffledWord, setShuffledWord] = useState(null);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [reset, setReset] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [timeUntilNextWord, setTimeUntilNextWord] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [isNameRegistered, setIsNameRegistered] = useState(false);
  const [playerRank, setPlayerRank] = useState(null);
  const [isDailyWordWon, setIsDailyWordWon] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      const storedDailyWord = JSON.parse(localStorage.getItem('dailyWordStatus')) || {};
      if (storedDailyWord.won === 'yes') {
        setIsDailyWordWon(true);
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (dailyWord && !isDailyWordWon) {
      const dailyWordShuffle = ShuffleWord({ words: dailyWord });
      setShuffledWord(dailyWordShuffle[0]);
      setStartTime(Date.now());
      setElapsedTime(0);
      setHasWon(false);
      setSelectedLetters([]);
      setIsNameRegistered(false);
      setPlayerRank(null);
    }
  }, [dailyWord, isDailyWordWon]);

  useEffect(() => {
    let timerInterval;
    if (!hasWon && startTime) {
      timerInterval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100); // Update every 100 milliseconds
    } else if (hasWon) {
      clearInterval(timerInterval);
    }
    return () => clearInterval(timerInterval);
  }, [hasWon, startTime]);

  useEffect(() => {
    if (selectedLetters.join('') === dailyWord) {
      setHasWon(true);
      // Update local storage to mark the word as won
      const storedDailyWord = JSON.parse(localStorage.getItem('dailyWordStatus')) || {};
      storedDailyWord.won = 'yes';
      localStorage.setItem('dailyWordStatus', JSON.stringify(storedDailyWord));
    }
  }, [selectedLetters, dailyWord]);

  useEffect(() => {
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
    const timerInterval = setInterval(updateTimer, 1000); // Update every second
    return () => clearInterval(timerInterval);
  }, [hasWon, isDailyWordWon]);

  const formatElapsedTime = (elapsedTime) => {
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = elapsedTime % 1000;

    return minutes > 0
      ? `${minutes}m ${seconds}.${milliseconds.toString().padStart(3, '0')}s`
      : `${seconds}.${milliseconds.toString().padStart(3, '0')}s`;
  };

  const handleRegister = () => {
    if (playerName.trim()) {
      const difficultyFactor = calculateDifficultyFactor(dailyWord);
      const adjustedScore = elapsedTime * difficultyFactor;

      const playerData = {
        name: playerName,
        score: adjustedScore,
        rawScore: elapsedTime,
        word: dailyWord,
      };

      // Update the leaderboard in local storage
      let storedData = JSON.parse(localStorage.getItem('dailyWordLeaderboard')) || [];
      storedData.push(playerData);
      storedData.sort((a, b) => a.score - b.score);
      const playerIndex = storedData.findIndex(data => data.name === playerName && data.score === adjustedScore);
      if (storedData.length > 10) {
        storedData = storedData.slice(0, 10);
      }
      localStorage.setItem('dailyWordLeaderboard', JSON.stringify(storedData));

      // Update the daily word status in local storage
      let storedDailyWord = JSON.parse(localStorage.getItem('dailyWordStatus')) || {};
      storedDailyWord.won = 'yes';
      localStorage.setItem('dailyWordStatus', JSON.stringify(storedDailyWord));

      setIsNameRegistered(true);
      setPlayerRank(playerIndex + 1);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  if (isLoading) {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }

  if (isDailyWordWon) {
    return (
      <div>
        <h2>Congratulations! You've already won today. Come back in {timeUntilNextWord} for a new word.</h2>
      </div>
    );
  }

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

      <p>Time taken: {formatElapsedTime(elapsedTime)}</p>
      {hasWon && !isNameRegistered && (
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleRegister}>Register</button>
        </div>
      )}
      {hasWon && isNameRegistered && (
        <div>
          <p>Your score has been saved. Thank you for playing, {playerName}!</p>
          {playerRank <= 10 ? (
            <p>Congratulations! You are ranked #{playerRank}.</p>
          ) : (
            <p>Unfortunately, your time is not in the top 10.</p>
          )}
        </div>
      )}
      {hasWon && <p>Time until next word: {timeUntilNextWord}</p>}
    </>
  );
};

export default DailyWord;
