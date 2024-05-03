import { useState, useEffect } from 'react';

/**
 * Utils to get a word from the trouve-mot API
 * @param {*} param0 type : 'daily' or 'random' for now
 * @returns
 */

// Je sais pas pourquoi il charge plein de fois ?
function GetWord({ type }) {
  const [word, setWord] = useState();

  useEffect(() => {
    let apiUrl = '';

    if (type === 'daily') {
      apiUrl = 'https://trouve-mot.fr/api/daily';
    } else if (type === 'random') {
      apiUrl = 'https://trouve-mot.fr/api/random';
    } else {
      console.error('Type Invalid. Use "daily" or "random"');
      return;
    }
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Random gives an array of words even if only one, so we cant use the same logic as for daily
        if (type === 'random') {
          if (data.length > 0) {
            setWord(data[0].name);
          } else {
            console.error('No word found in response:', data);
          }
        } else {
          setWord(data.name);
        }
      })
      // Sometimes the API is down or overused so we need to catch an error
      .catch(error => console.error('Error fetching word:', error));
  }, [type]);
  console.log('Word:', word);
  return word;
}

export default GetWord;
