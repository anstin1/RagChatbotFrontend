// Custom hook for chat functionality
import { useState, useEffect, useRef, useCallback } from 'react';
import { api } from '../services/api';

export const useChat = () => {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typingMessage, setTypingMessage] = useState('');
  
  const initRef = useRef(false);

  const loadSessionHistory = useCallback(async (sid) => {
    try {
      const response = await api.getSessionHistory(sid);
      setMessages(response.history);
    } catch (error) {
      console.error('Failed to load session history:', error);
    }
  }, []);

  const initializeSession = useCallback(async () => {
    try {
      const response = await api.createSession();
      const newSessionId = response.sessionId;
      setSessionId(newSessionId);
      sessionStorage.setItem('chatSessionId', newSessionId);
      await loadSessionHistory(newSessionId);
    } catch (error) {
      console.error('Failed to initialize session:', error);
    }
  }, [loadSessionHistory]);

  useEffect(() => {
    // Avoid double init under React 18 StrictMode
    if (initRef.current) return;
    initRef.current = true;

    const existing = sessionStorage.getItem('chatSessionId');
    if (existing) {
      setSessionId(existing);
      loadSessionHistory(existing);
    } else {
      initializeSession();
    }
  }, [initializeSession, loadSessionHistory]);

  const sendMessage = async (message) => {
    setInputMessage('');
    setIsLoading(true);

    setTypingMessage('Bot is typing...');
    let dots = '';
    const typingInterval = setInterval(() => {
      dots = dots.length >= 3 ? '' : dots + '.';
      setTypingMessage(`Bot is thinking${dots}`);
    }, 500);

    try {
      const response = await api.sendMessage(sessionId, message);

      const userMessage = {
        id: Date.now(),
        type: 'user',
        content: message,
        timestamp: new Date().toISOString()
      };

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response.response,
        passages: response.passages,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, userMessage, botMessage]);
      setIsLoading(false);
      clearInterval(typingInterval);
      setTypingMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
      clearInterval(typingInterval);
      setIsLoading(false);
      setTypingMessage('');
      const details = error?.response?.data?.details || error?.response?.data?.error || error?.message || 'Unknown error';
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'bot',
        content: `Sorry, I encountered an error processing your message. ${details}`,
        timestamp: new Date().toISOString(),
        isError: true
      }]);
    }
  };

  const clearSession = async () => {
    if (!sessionId) return;
    try {
      await api.clearSession(sessionId);
      setMessages([]);
      sessionStorage.removeItem('chatSessionId');
      setSessionId(null);
      await initializeSession();
    } catch (error) {
      console.error('Failed to clear session:', error);
    }
  };

  return {
    sessionId,
    messages,
    inputMessage,
    setInputMessage,
    isLoading,
    typingMessage,
    sendMessage,
    clearSession
  };
};
