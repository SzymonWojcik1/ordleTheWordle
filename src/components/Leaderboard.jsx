/* eslint-disable react/prop-types */
import { useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardType, setLeaderboardType] = useState('');
  const [searchName, setSearchName] = useState('');

  const handleButtonClick = (type) => {
    const storedData = localStorage.getItem(`${type}Leaderboard`);
    if (storedData) {
      setLeaderboard(JSON.parse(storedData));
      setLeaderboardType(type);
    } else {
      setLeaderboard([]);
      setLeaderboardType('');
    }
  };

  const handleSearch = (e) => {
    setSearchName(e.target.value);
  };

  const filteredLeaderboard = leaderboard.filter(player =>
    player.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <>
      <h1>Leaderboard</h1>
      <div>
        <button onClick={() => handleButtonClick('dailyWord')}>Daily Word</button>
        <button onClick={() => handleButtonClick('randomWord')}>Random Word</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={handleSearch}
        />
      </div>
      {filteredLeaderboard.length > 0 && (
        <div>
          <h2>{leaderboardType === 'dailyWord' ? 'Daily Word' : 'Random Word'} Leaderboard</h2>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
                <th>Word</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaderboard.map((player, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{player.name}</td>
                  <td>{player.score}</td>
                  <td>{player.word.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Leaderboard;
