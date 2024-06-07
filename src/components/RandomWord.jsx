import { useState, useEffect } from 'react';
import GetWord from "./utils/GetWord";
import ShuffleWord from "./utils/ShuffleWord";
import WordButtons from './utils/WordButtons';
import SelectedLetters from './utils/SelectedLetters';
import ResetButton from './utils/ResetButton';
import { handleLetterSelect, handleReset } from './utils/Handlers';
import {calculateDifficultyFactor} from './utils/CalculateDifficultyFactor'

const RandomWord = () => {
  const handleRefresh = () => {
    window.location.reload(); // Reload the page
  };
  const words = GetWord({ type: 'random'});
  const [shuffledWord, setShuffledWord] = useState(null);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [reset, setReset] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [isNameRegistered, setIsNameRegistered] = useState(false);
  const [playerRank, setPlayerRank] = useState(null);

   // Pass words as an object property
  useEffect(() => {
    if (words) {
      const shuffledWords = ShuffleWord({ words });
      setShuffledWord(shuffledWords[0]);
      setStartTime(Date.now());
      setElapsedTime(0);
      setHasWon(false);
      setSelectedLetters([]);
      setIsNameRegistered(false);
      setPlayerRank(null);
    }
  }, [words]);

  useEffect(() => {
    let timerInterval;
    if (!hasWon && startTime) {
      timerInterval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
    } else if (hasWon) {
      clearInterval(timerInterval);
    }
    return () => clearInterval(timerInterval);
  }, [hasWon, startTime]);

  useEffect(() => {
    if (selectedLetters.join('') === words) {
      setHasWon(true);
    }
  }, [selectedLetters, words]);

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
      const difficultyFactor = calculateDifficultyFactor(words);
      const adjustedScore = (elapsedTime * difficultyFactor).toFixed(2);

      const playerData = {
        name: playerName,
        score: adjustedScore,
        rawScore: elapsedTime,
        word: words,
      };

      let storedData = JSON.parse(localStorage.getItem('randomWordLeaderboard')) || [];
      storedData.push(playerData);
      storedData.sort((a, b) => a.score - b.score);
      const playerIndex = storedData.findIndex(data => data.name === playerName && data.score === adjustedScore);
      if (storedData.length > 10) {
        storedData = storedData.slice(0, 10);
      }
      localStorage.setItem('randomWordLeaderboard', JSON.stringify(storedData));
      setIsNameRegistered(true);
      setPlayerRank(playerIndex + 1);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  if (!shuffledWord) {
    return <div><h2>Loading...</h2></div>;
  }

  return (
    <>
      <h3>Random Word : </h3>
      <WordButtons word={shuffledWord} onLetterClick={(letter) => handleLetterSelect(letter, selectedLetters, setSelectedLetters, words, setHasWon)} reset={reset} />
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
      <button onClick={handleRefresh}>Refresh</button>
    </>
  );
};

export default RandomWord;
