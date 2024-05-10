/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import GetWord from './utils/GetWord';
import ShuffleWord from './utils/ShuffleWord';

/**
 *
 * @param {*} param0
 * @returns
 */
const WordButtons = ({ word, onLetterClick, reset }) => {
  const [currentWord, setCurrentWord] = useState(word);

  const handleClick = (letter, index) => {
    onLetterClick(letter);
    const newWord = currentWord.split('');
    newWord.splice(index, 1);
    setCurrentWord(newWord.join(''));
  };

  useEffect(() => {
    setCurrentWord(word);
  }, [word, reset]);

  return (
    <div>
      {currentWord.split('').map((letter, index) => (
        <button key={index} type="button" onClick={() => handleClick(letter, index)}>
          {letter}
        </button>
      ))}
    </div>
  );
};

const Home = () => {
  //const dailyWord = GetWord({ type: 'daily' });
  const dailyWord = GetWord({ type: 'random', nbWord : '1', maxSize : '6'});
  const [shuffledWord, setShuffledWord] = useState(null);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [reset, setReset] = useState(false);

  const handleLetterSelect = (letter) => {
    setSelectedLetters([...selectedLetters, letter]);
  };

  const handleReset = () => {
    setSelectedLetters([]);
    setReset(!reset);
  };

  useEffect(() => {
    if (dailyWord) {
      const dailyWordShuffle = ShuffleWord({ words: dailyWord });
      setShuffledWord(dailyWordShuffle[0]);
    }
  }, [dailyWord, reset]);

  if (!shuffledWord) {
    return <div><h2>Loading...</h2></div>;
  }

  return (
    <>
      <h3>Word: {dailyWord}</h3>
      <WordButtons word={shuffledWord} onLetterClick={handleLetterSelect} reset={reset} />
      <div>
        <h4>Selected Letters:</h4>
        {selectedLetters.map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </div>
      <p></p>
      <button onClick={handleReset}>Reset</button>
    </>
  );
};

export default Home;