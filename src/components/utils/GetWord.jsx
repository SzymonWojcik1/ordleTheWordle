import { useState, useEffect } from 'react';

const GetWord = ({ type, nbWord, maxSize }) => {
  const [words, setWords] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date().toISOString().split('T')[0]; // Today date YYYY-MM-DD
        const storedData = JSON.parse(localStorage.getItem('dailyWord')) || {};

        if (type === 'daily' && storedData.word && storedData.date === today) {
          setWords([storedData.word]);
        } else {
          let fetchedWord;
          do {
            await new Promise(resolve => setTimeout(resolve, 500)); // Delay de 0.5sec to let it find the word and not give null/undifined
            const apiUrl = type === 'daily' ? 'https://trouve-mot.fr/api/sizemax/6/1' : `https://trouve-mot.fr/api/sizemax/${maxSize}/${nbWord}`;
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (type === 'random' && Array.isArray(data)) {
              const fetchedWords = data.map(item => item.name).slice(0, nbWord);
              setWords(fetchedWords);
              fetchedWord = fetchedWords[0];
            } else {
              fetchedWord = data[0]?.name;
              setWords([fetchedWord]);

              if (type === 'daily') {
                localStorage.setItem('dailyWord', JSON.stringify({ word: fetchedWord, date: today }));
              }
            }
          } while (fetchedWord === undefined);
        }
      } catch (error) {
        console.error('Error fetching word:', error);
      }
    };

    fetchData();
  }, [type, nbWord, maxSize ]);

  console.log(words);

  return words;
};

export default GetWord;