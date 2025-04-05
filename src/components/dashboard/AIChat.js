import React, { useState, useEffect } from 'react';
import './AIChat.css';
import { GoogleGenerativeAI } from '@google/generative-ai';

const AIChat = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genAI, setGenAI] = useState(null);

  useEffect(() => {
    const genAIInstance = new GoogleGenerativeAI('AIzaSyBCHpmZfEKE8s_CVYwuOJet3we6-IHfD7Q');
    setGenAI(genAIInstance);
  }, []);

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
      
      {isLoading && <div className="loading">Loading...</div>}
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
