import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Media from './pages/Media';
import Writing from './pages/Writing';
import News from './pages/News';
import Upload from './pages/Upload';
import Debug from './pages/Debug';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/media" element={<Media />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/news" element={<News />} />
          <Route path="/upload" element={<Upload />} />
          {/* <Route path="/debug" element={<Debug />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
