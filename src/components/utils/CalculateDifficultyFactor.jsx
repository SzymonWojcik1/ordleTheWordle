export const calculateDifficultyFactor = (words) => {
  let totalLength = 0;

  // Calculate the total length of all words in the array
  for (let word of words) {
    totalLength += word.length;
  }

  // Calculate the average length of words
  let averageLength = totalLength / words.length;

  if (averageLength <= 3) {
    return 1;
  } else if (averageLength >= 4 && averageLength <= 6) {
    return 0.6;
  } else if (averageLength >= 7 && averageLength <= 9) {
    return 0.4;
  } else {
    return 0.3;
  }
};