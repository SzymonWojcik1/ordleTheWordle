/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

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

export default WordButtons;