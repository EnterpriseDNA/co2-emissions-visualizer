import React from 'react';

const DarkModeToggle = ({ darkMode, setDarkMode }) => (
  <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
    {darkMode ? '☀️' : '🌙'}
  </button>
);

export default DarkModeToggle;