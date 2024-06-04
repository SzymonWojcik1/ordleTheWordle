/* eslint-disable react/prop-types */

const ResetButton = ({ onReset }) => {
  return (
    <button onClick={onReset}>Reset the letters</button>
  );
};

export default ResetButton;