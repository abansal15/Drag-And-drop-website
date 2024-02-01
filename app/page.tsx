import React from 'react';
import Toolbar from './components/Toolbar';
import WebsiteBuilder from './components/WebsiteBuilder';

const Home = () => {
  return (
    <div>
      <div>
        <Toolbar />
      </div>
      <div style={{ float: 'left', width: '80%', padding: '20px', boxSizing: 'border-box' }}>
        <WebsiteBuilder />
      </div>
    </div>
  );
};

export default Home;
