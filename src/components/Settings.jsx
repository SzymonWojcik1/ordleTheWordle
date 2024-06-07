import { useState, useEffect } from 'react';

const Settings = () => {
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Retrieve the settings object from localStorage on component mount
    const savedSettings = localStorage.getItem('gameSettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      if (parsedSettings.nbLetters) {
        setNumber(parsedSettings.nbLetters.toString());
      }
    }
  }, []);

  const handleNumberChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and ensure it is at least 4
    if (/^\d*$/.test(value)) {
      if (value === '' || Number(value) >= 4) {
        setNumber(value);
        setIsError(false);
        setMessage('');
      } else {
        setNumber(value);
        setIsError(true);
        setMessage('You cannot enter a number lower than 4.');
      }
    }
  };

  const handleSave = () => {
    if (number === '' || Number(number) < 4) {
      setIsError(true);
      setMessage('You cannot enter a number lower than 4.');
    } else {
      setIsError(false);
      setMessage('The settings have been saved');
      // Save the new value to localStorage
      const savedSettings = localStorage.getItem('gameSettings');
      const parsedSettings = savedSettings ? JSON.parse(savedSettings) : {};
      parsedSettings.nbLetters = Number(number);
      localStorage.setItem('gameSettings', JSON.stringify(parsedSettings));
    }
  };

  return (
    <>
      <h1>Settings</h1>
      <div>
        <label>
          Maximum of letters in <strong>Random Word</strong> : 
          <input
            type="text"
            value={number}
            onChange={handleNumberChange}
          />
        </label>
      </div>
      <div>
        <button
          onClick={handleSave}
          style={{ backgroundColor: number === '' || Number(number) < 4 ? 'red' : 'initial' }}
        >
          Save
        </button>
      </div>
      {message && (
        <p style={{ color: isError ? 'red' : 'green' }}>
          {message}
        </p>
      )}
    </>
  );
};

export default Settings;
