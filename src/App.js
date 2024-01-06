import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'
import './styles.css'

import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Project1 from './pages/Project1';

function App() {

  return (
    <div className="margins">
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="*" element={<Home />} /> {/* invalid urls redirect to Home */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/badger-bakery" element={<Project1 />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
