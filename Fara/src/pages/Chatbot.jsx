import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './chatbot.css';

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you today?", from: "bot" },
  ]);
  const [input, setInput] = useState("");
  const messageEndRef = useRef(null);

  // Add second bot message automatically after 1.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { text: "Hi there! Ask me about our upcoming events.", from: "bot" }
      ]);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input.trim(), from: "user" };
    setMessages((prev) => [...prev, userMsg]);

    await fetchBotResponse(input.trim());
    setInput("");
  };

  const fetchBotResponse = async (message) => {
    try {
      const res = await axios.post("http://localhost:5001/chat", {
        message,
      });
      const botMsg = { text: res.data.response, from: "bot" };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: `You said: ${message}`, from: "bot" },
      ]);
      console.error("Error sending message:", err);
    }
  };

  // ✅ Updated quick reply handler using fetchBotResponse
  const handleQuickReply = async (question) => {
    const userMsg = { text: question, from: "user" };
    setMessages(prev => [...prev, userMsg]);
    await fetchBotResponse(question);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <span className="chatbot-title">Event Assistant</span>
        <button className="chatbot-close" onClick={onClose} aria-label="Close chatbot">×</button>
      </div>

      <div className="chatbox">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message ${msg.from}`}
            title={msg.from === 'user' ? 'You' : 'Bot'}
          >
            <strong>{msg.from === "user" ? "You" : "Bot"}: </strong>{msg.text}

            {/* Show buttons below specific bot message */}
            {msg.from === 'bot' && msg.text.includes('upcoming events') && (
              <div className="quick-buttons">
                <button onClick={() => handleQuickReply('Show upcoming events')}>📅 View Events</button>
                <button onClick={() => handleQuickReply('How to register for events?')}>🎫 Register</button>
                <button onClick={() => handleQuickReply('What time are the events?')}>🕒 Timings</button>
              </div>
            )}
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          aria-label="Chat input"
        />
        <button onClick={handleSend} aria-label="Send message">Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
