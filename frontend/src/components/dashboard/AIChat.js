import React, { useState, useEffect, useRef } from 'react';
import './AIChat.css';
import { GoogleGenerativeAI } from '@google/generative-ai';

const AIChat = () => {
  const chatWindowRef = useRef(null);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genAI, setGenAI] = useState(null);

  useEffect(() => {
    const genAIInstance = new GoogleGenerativeAI('AIzaSyBCHpmZfEKE8s_CVYwuOJet3we6-IHfD7Q');
    setGenAI(genAIInstance);
  }, []);

  // Auto-scroll to bottom when conversation updates
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [conversation]);

  const handleSend = async () => {
    if (!message.trim() || !genAI) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      setConversation(prev => [...prev, { role: 'user', content: message }]);
      
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(message);
      const response = await result.response;
      const text = response.text();
      
      setConversation(prev => [...prev, { role: 'ai', content: text }]);
    } catch (err) {
      setError('Error: ' + err.message);
      setConversation(prev => [...prev, { 
        role: 'ai', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
      setMessage('');
    }
  };

  return (
    <div className="ai-chat-container">
      <div className="chat-window">
        {conversation.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>
      
      {isLoading && (
        <div className="loading">
          <div className="loader">
            <svg viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="32"></circle>
            </svg>
          </div>
          <div className="loader triangle">
            <svg viewBox="0 0 86 80">
              <polygon points="43 8 79 72 7 72"></polygon>
            </svg>
          </div>
          <div className="loader">
            <svg viewBox="0 0 80 80">
              <rect x="8" y="8" width="64" height="64"></rect>
            </svg>
          </div>
        </div>
      )}
      {error && <div className="error">{error}</div>}
      
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button 
          onClick={handleSend} 
          disabled={isLoading || !message.trim()}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default AIChat;
