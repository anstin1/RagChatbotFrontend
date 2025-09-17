// Chat input form component
import React from 'react';

const InputForm = ({ 
  inputMessage, 
  setInputMessage, 
  isLoading, 
  sessionId, 
  onSendMessage 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading || !sessionId) return;
    onSendMessage(inputMessage.trim());
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask me about news..."
          disabled={isLoading || !sessionId}
          className="message-input"
        />
        <button 
          type="submit" 
          disabled={isLoading || !inputMessage.trim() || !sessionId} 
          className="send-btn"
        >
          {isLoading ? '⏳' : '📤'}
        </button>
      </div>
    </form>
  );
};

export default InputForm;
