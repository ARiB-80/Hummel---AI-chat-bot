import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const lightTheme = {
  background: '#ffffff',
  card: '#f5f5f5',
  text: '#000000',
  subText: '#888888',
  inputBg: '#f5f5f5',
  border: '#f0f0f0',
  buttonBg: '#000000',
  buttonText: '#ffffff',
  navBg: '#ffffff',
};

export const darkTheme = {
  background: '#121212',
  card: '#1e1e1e',
  text: '#ffffff',
  subText: '#aaaaaa',
  inputBg: '#2a2a2a',
  border: '#333333',
  buttonBg: '#ffffff',
  buttonText: '#000000',
  navBg: '#1a1a1a',
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(prev => !prev);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);