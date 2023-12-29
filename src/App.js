import React from 'react';
import Header from './Header';
import Footer from './Footer';
import croissant from './croissant.jpg';

function App() {

  const helveticaStyle = {
    fontFamily: 'Helvetica, sans-serif',
  };

  const centeredContentStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const textContainerStyle = {
    textAlign: 'center',
    padding: '20px',
    marginRight: '100px'
  };

  const h1Style = {
    fontSize: '36px',
  };

  const pStyle = {
    fontSize: '18px',
  };

  const containerStyle = {
    backgroundColor: 'lavender',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
  };

  const contentContainerStyle = {
    margin: '50px',
    padding: '50px',
    display: 'flex',
    alignItems: 'top',
  };

  return (
    <div style={helveticaStyle}>
      <Header />
      <div style={containerStyle} className="page-container">
        <div style={contentContainerStyle} className="centered-content">
          <div style={textContainerStyle} class="text-container">
            <h1 style={h1Style}>Rachael Lang</h1>
            <p style={pStyle}>Hi! I'm Rachael</p>
          </div>
          <div className="image-container">
            <img
              style={{ width: '200px', height: '200px' }}
              src={croissant}
              alt="image of croissant"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
