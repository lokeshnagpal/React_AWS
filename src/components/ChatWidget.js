import { useState, useEffect } from 'react';
import styles from '../styles/ChatWidget.module.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', sender: 'bot' }
  ]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // const handleSendMessage = (e) => {
  //   e.preventDefault();
  //   if (message.trim() === '') return;

  //   // Add user message
  //   const newUserMessage = {
  //     id: messages.length + 1,
  //     text: message,
  //     sender: 'user'
  //   };

  //   setMessages([...messages, newUserMessage]);
  //   setMessage('');

  //   // Simulate bot response
  //   setTimeout(() => {
  //     const botResponse = {
  //       id: messages.length + 2,
  //       text: 'Thanks for your message! Our team will get back to you soon.',
  //       sender: 'bot'
  //     };
  //     setMessages(prev => [...prev, botResponse]);
  //   }, 1000);
  // };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5678/webhook/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any required headers here
        },
        body: JSON.stringify({ message: message })
      });

      if (!response.ok) throw new Error('Failed to get response from server');

      const data = await response.json();

      // Add bot response
      const botResponse = {
        id: Date.now() + 1,
        text: data.reply, // Adjust based on your n8n response structure
        sender: 'bot'
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message to chat
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, there was an error processing your message. Please try again.',
        sender: 'bot'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={`${styles.chatWidget} ${isOpen ? styles.open : ''}`}>
      {isOpen ? (
        <div className={styles.chatContainer}>
          <div className={styles.chatHeader}>
            <h3>Chat with us</h3>
            <button onClick={toggleChat} className={styles.closeButton}>×</button>
          </div>
          <div className={styles.messagesContainer}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.message} ${msg.sender === 'user' ? styles.userMessage : styles.botMessage}`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.message} ${styles.botMessage} ${styles.typingIndicator}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </div>
          <form onSubmit={handleSendMessage} className={styles.messageForm}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className={styles.messageInput}
            />
            <button type="submit" className={styles.sendButton}>
              Send
            </button>
          </form>
        </div>
      ) : (
        <button onClick={toggleChat} className={styles.chatButton}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
