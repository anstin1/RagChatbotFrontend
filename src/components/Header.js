// App header component
import React from 'react';

const Header = ({ sessionId, messages, onClearSession }) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1>News Chatbot</h1>
        <div className="header-info">
          <button 
            className="clear-btn" 
            onClick={onClearSession}
            disabled={!sessionId || messages.length === 0}
          >
            Clear Chat
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
