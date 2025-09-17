// Individual message component
import React from 'react';

const MessageItem = ({ message }) => {
  const isUser = message.type === 'user';
  
  const formatTimestamp = (timestamp) => new Date(timestamp).toLocaleTimeString();

  return (
    <div className={`message ${isUser ? 'user' : 'bot'} ${message.isError ? 'error' : ''}`}>
      <div className="message-content">
        <div className="message-text">{message.content}</div>
        {message.passages && message.passages.length > 0 && (
          <div className="message-sources">
            <h4>Sources:</h4>
            <div className="sources-list">
              {message.passages.map((passage, index) => (
                <div key={index} className="source-item">
                  <h5>{passage.title}</h5>
                  <p>{passage.content.substring(0, 150)}...</p>
                  <div className="source-meta">
                    <span>Relevance: {(passage.score * 100).toFixed(1)}%</span>
                    {passage.url && (
                      <a href={passage.url} target="_blank" rel="noopener noreferrer">
                        Read more
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="message-timestamp">{formatTimestamp(message.timestamp)}</div>
      </div>
    </div>
  );
};

export default MessageItem;
