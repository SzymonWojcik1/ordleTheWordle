/* eslint-disable react/prop-types */
const ShuffleWord = ({ words }) => {
  // Function to shuffle a single word
  const shuffleWord = (word) => {
    if (!word) return null;

    // Convert the word to an array of characters
    let chars = word.split('');

    // Shuffle the chars in a random sequence
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }

    // Join the letters to form the word
    const shuffledWord = chars.join('');

    // Check if the shuffled word is the same as the original word
    if (shuffledWord === word) {
      return shuffleWord(word);
    }

    return shuffledWord;
  };

  // Check if words is not null before shuffling to prevent errors
  if (!words) return null;

  // Loop to shuffle the words inside of the array
  const shuffledWords = words.map((word) => shuffleWord(word));

  return shuffledWords;
};

export default ShuffleWord;
