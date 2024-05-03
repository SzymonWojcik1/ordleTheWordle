import GetWord from './utils/GetWord';
import ShuffleWord from './utils/ShuffleWord';

/**
 * The game by default where you need to find the right order of the word for the game
 *
 */
const Home = () => {
  // get the word
  const words = GetWord({ type: 'daily' });
  // shuffle the word
  const shuffledWords = ShuffleWord({ words: words });

  // Security so that it does not try to show or shuffle an empty array
  if (words === null) {
    return (
      <>
        <h3>Loading...</h3>
      </>
    );
  }

  // explore the map and show the word in the good order and the order that has been shuffled
  return (
    <>
      <h3>Daily Words</h3>
      <div>
      {words.map((word, index) => (
          <p key={index}>{word}</p>
        ))}
        {shuffledWords.map((word, index) => (
          <p key={index}>{word}</p>
        ))}
      </div>
    </>
  );
};

export default Home;
