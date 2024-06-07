/* eslint-disable react/prop-types */

const Home = () => {
  return (
    <>
      <h1>HOME</h1>
      <p>Welcome to the Ordle The Wordle!</p>
      <p>
        The objective of the game is to rearrange the given letters to form a valid word. Every day, a new word will be provided for you to solve.
      </p>
      <p>
        Here’s how the game works:
      </p>

        You will be given a set of shuffled letters that form a hidden word.
        Your task is to arrange these letters in the correct order to reveal the word.
        The score is calculated based on the time you take to find the word and the difficulty level of the word.
        The longer the word, the more challenging it is, and solving it will improve your rank significantly.
        Your goal is to achieve a score as close to 0 as possible; the lower your score, the higher your rank.

      <p>
        Additionally, there are two types of leaderboards:
      </p>

          <strong>Daily Word:</strong> A new word is provided each day, and you can compete with other players to solve it as quickly as possible. The leaderboard resets daily.
          <br />
          <strong>Random Word:</strong> You can also choose to solve randomly selected words. The leaderboard for random words allows you to see your all-time best scores and compare them with others.
          <br />
          <strong>Settings:</strong> The settings here are for changing the maximum letters allowed in the random words. Don't forget the longer the word the better you will be ranked !
      <p>
        To get started, click on the "Daily Word" or "Random Word" button, and begin solving the word puzzle. Once you have successfully found the word, you can register your score by entering your name. Check the leaderboard to see how you rank against other players.
      </p>
      <p>
        Good luck, and have fun playing!
      </p>
    </>
  );
};

export default Home;
