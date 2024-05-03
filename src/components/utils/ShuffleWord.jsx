/* eslint-disable react/prop-types */
/**
 * Shuffle the words in the array in a random manner
 * @param {*} param0
 * @returns an array with shuffled words
 */
const ShuffleWord = ({ words }) => {
  // Function to shuffle a single word
  const shuffleWord = (word) => {
    if (!word) return null;

    // Convert the word to an array of characters
    let chars = word.split('');

    // Shuffle the characters using Fisher-Yates algorithm
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }

    // Join the shuffled characters back into a word
    return chars.join('');
  };

  // Check if words is not null before shuffling
  if (!words) return null;

  // Shuffle each word in the array
  const shuffledWords = words.map((word) => shuffleWord(word));

  return shuffledWords;
};

export default ShuffleWord;
