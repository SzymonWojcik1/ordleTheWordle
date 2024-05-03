import { useState, useEffect } from 'react';

/**
 * Get an array of words with the maxsize of the word and number of words or the word of the day
 * @param {*} param0
 * @returns
 */
const GetWord = ({ type, nbWord, maxSize }) => {
  const [words, setWords] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = type === 'daily' ? 'https://trouve-mot.fr/api/daily' : `https://trouve-mot.fr/api/sizemax/${maxSize}/${nbWord}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Check if it's a random type and data is an array
        if (type === 'random' && Array.isArray(data)) {
          const fetchedWords = data.map(item => item.name).slice(0, nbWord);
          setWords(fetchedWords);
        } else {
          const fetchedWord = type === 'daily' ? data.name : data[0]?.name;
          setWords([fetchedWord]);
        }
      } catch (error) {
        console.error('Error fetching word:', error); // Too many tries or the api is down
      }
    };

    fetchData();

  }, [type, nbWord, maxSize ]); // Dependency array including type, nbWord and maxSize

  console.log(words); // Log the word(s) to the console

  return words;
};

export default GetWord;
