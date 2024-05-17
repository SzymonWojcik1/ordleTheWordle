/* eslint-disable react/prop-types */

const SelectedLetters = ({ letters }) => {
  return (
    <div>
      <h3>Selected Letters:</h3>
      {letters.map((letter, index) => (
        <span key={index}>{letter}</span>
      ))}
    </div>
  );
};

export default SelectedLetters;