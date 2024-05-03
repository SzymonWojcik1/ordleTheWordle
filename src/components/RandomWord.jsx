import GetWord from "./utils/GetWord";
import ShuffleWord from "./utils/ShuffleWord";

/**
 * Page that gives the play a randomword
 * @returns
 */
const RandomWord = () => {
  const handleRefresh = () => {
    window.location.reload(); // Reload the page
  };
  const words = GetWord({ type: 'random', nbWord : '5', maxSize : '4'});

  // Security check if words is not null before shuffling
  if (words === null) {
    return (
      <>
        <h3>Loading...</h3>
      </>
    );
  }

  const shuffledWords = ShuffleWord({ words }); // Pass words as an object property


  return (
    <>
      <h3>Random Word</h3>
      <div>
        {words.map((word, index) => (
          <p key={index}>{word}</p>
        ))}
        {shuffledWords.map((word, index) => (
          <p key={index}>{word}</p>
        ))}
      <button onClick={handleRefresh}>Refresh</button> {/* Button to refresh the page */}
      </div>
    </>
  );
};

export default RandomWord;
