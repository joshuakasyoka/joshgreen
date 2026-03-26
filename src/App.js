import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import About from './components/About';
import Portfolio from './components/Portfolio';
import './index.css';
import './CustomCursor.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.body.classList.toggle('theme-dark', isDarkMode);
    document.body.classList.toggle('theme-light', !isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/about" element={<About isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
      </Routes>
    </Router>
  );
}

export default App;
