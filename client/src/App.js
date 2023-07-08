import logo from './logo.svg';
import React from 'react';

import './App.css';
import ChatBotRobot from './Chatbot.compoenent';

function App() {
  return (
    <span>
      <ChatBotRobot />
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Node js Chat Bot</p>
        </header>
      </div>
    </span>
  );
};

export default App;
