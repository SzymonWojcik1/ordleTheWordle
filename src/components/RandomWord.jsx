import GetWord from "./utils/GetWord";

const RandomWord = () => {
  const word = GetWord({ type: 'random' });

  return (
    <>
      <h3>Random Word</h3>
      <div>
        <p>RandomWord is : {word}</p>
      </div>
    </>
  );
};

export default RandomWord;
