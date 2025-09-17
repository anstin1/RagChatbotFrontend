// src/App.js
import React from 'react';
import './App.scss';
import Header from './components/Header';
import MessageList from './components/MessageList';
import InputForm from './components/InputForm';
import { useChat } from './hooks/useChat';

function App() {
  const {
    sessionId,
    messages,
    inputMessage,
    setInputMessage,
    isLoading,
    typingMessage,
    sendMessage,
    clearSession
  } = useChat();

  return (
    <div className="app">
      <Header 
        sessionId={sessionId}
        messages={messages}
        onClearSession={clearSession}
      />

      <main className="chat-container">
        <div className="messages-container">
          <MessageList 
            messages={messages}
            typingMessage={typingMessage}
          />
        </div>

        <InputForm
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          isLoading={isLoading}
          sessionId={sessionId}
          onSendMessage={sendMessage}
        />
      </main>

      <footer className="app-footer">
        <p>Powered by RAG pipeline with Gemini AI • Session: {sessionId?.substring(0, 8)}...</p>
      </footer>
    </div>
  );
}

export default App;