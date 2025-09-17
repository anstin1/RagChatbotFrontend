// Message list component with auto-scroll
import React, { useEffect, useRef } from 'react';
import MessageItem from './MessageItem';

const MessageList = ({ messages, typingMessage }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (messages.length === 0) {
    return (
      <div className="welcome-message">
        <h2>Welcome to News Chatbot!</h2>
        <p>Ask me anything about recent news and I'll help you find relevant information.</p>
        <div className="example-queries">
          <h3>Try asking about:</h3>
          <ul>
            <li>"What's the latest on climate change agreements?"</li>
            <li>"Tell me about recent tech developments"</li>
            <li>"What's happening in the global economy?"</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="messages-list">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      {typingMessage && (
        <div className="message bot typing">
          <div className="message-content">
            <div className="message-text">{typingMessage}</div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
