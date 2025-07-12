import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import About from './components/About';
import Portfolio from './components/Portfolio';
import './index.css';
import './CustomCursor.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
