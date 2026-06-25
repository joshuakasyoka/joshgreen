import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import About from './components/About';
import Portfolio from './components/Portfolio';
import ClickTrail from './components/ClickTrail';
import IntroAnimation from './components/IntroAnimation';
import './index.css';
import './CustomCursor.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [showIntro, setShowIntro] = useState(() => {
    try {
      const forceIntro = new URLSearchParams(window.location.search).get('intro') === '1';
      if (forceIntro) return true;
      return sessionStorage.getItem('intro-seen') !== 'true';
    } catch {
      return true;
    }
  });

  useEffect(() => {
    document.body.classList.toggle('theme-dark', isDarkMode);
    document.body.classList.toggle('theme-light', !isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const handleIntroComplete = () => {
    try {
      sessionStorage.setItem('intro-seen', 'true');
    } catch {
      /* ignore */
    }
    setShowIntro(false);
  };

  return (
    <Router>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      <ClickTrail enabled={isDarkMode} />
      <Routes>
        <Route path="/" element={<Portfolio isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/about" element={<About isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
      </Routes>
    </Router>
  );
}

export default App;
