import GetWord from './utils/GetWord';


const Home = () => {
  const word = GetWord({ type: 'daily' });

  return (
    <>
      <h3>Daily Word</h3>
      <div>
        <p>Daily word is : {word}</p>
      </div>
    </>
  );
};

export default Home;
