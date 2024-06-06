import { useState, useEffect } from 'react';

const GetWord = ({ type, maxSize }) => {
  const [words, setWords] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date().toISOString().split('T')[0]; // Today's date
        const storedData = JSON.parse(localStorage.getItem('dailyWordStatus')) || {};
        const settingsData = JSON.parse(localStorage.getItem('gameSettings')) || {};

        // Check if settingsData.nbLetters is null or undefined, and set it to 9 if so
        if (!settingsData.nbLetters) {
          settingsData.nbLetters = 9;
          localStorage.setItem('gameSettings', JSON.stringify(settingsData));
        }

        if (type === 'daily' && storedData.word && storedData.date === today) {
          setWords([storedData.word]);
        } else {
          let fetchedWord;
          do {
            await new Promise(resolve => setTimeout(resolve, 500)); // Delay of 0.5 sec to let it find the word and not give null/undefined
            const apiUrl = type === 'daily'
              ? 'https://trouve-mot.fr/api/sizemax/6/1'
              : `https://trouve-mot.fr/api/sizemax/${settingsData.nbLetters}`;
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (type === 'random' && Array.isArray(data)) {
              const fetchedWords = data.map(item => item.name).slice(0);
              setWords(fetchedWords);
              fetchedWord = fetchedWords[0];
            } else {
              fetchedWord = data[0]?.name;
              setWords([fetchedWord]);

              if (type === 'daily') {
                localStorage.setItem('dailyWordStatus', JSON.stringify({ word: fetchedWord, date: today, won: 'no' }));
              }
            }
          } while (fetchedWord === undefined);
        }
      } catch (error) {
        console.error('Error fetching word:', error);
      }
    };

    fetchData();
  }, [type, maxSize]);

  console.log(words);

  return words;
};

export default GetWord;
