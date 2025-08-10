import React, { useState } from 'react';
import '../pages/Home.css';
import Chatbot from '../pages/Chatbot'; // ✅ Make sure path is correct
import botIcon from '../assets/bot-icon.png'; // ✅ Add this image inside /assets/

function Home() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div>
      {/* 🎞️ Hero Section */}
      <div className="hero-section">
        <div className="slider-background">
          <div className="slide-track">
            <img src="https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=2071&auto=format&fit=crop" alt="Event 1" />
            <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop" alt="Event 2" />
            <img src="https://plus.unsplash.com/premium_photo-1663076211121-36754a46de8d?q=80&w=2070&auto=format&fit=crop" alt="Event 3" />
            <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop" alt="Event 4" />
            <img src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2070&auto=format&fit=crop" alt="Event 5" />
          </div>
        </div>

        <div className="hero-content">
          <p className="Event">-------------- EVENT PLANNER PERTH -------------------</p>
          <h1 className="h1special">LET'S MAKE YOUR MEMORIES SPECIAL</h1>
          <h4 className="h4holds">
            DAY THAT HOLDS A PLACE IN OUR HEART, WITH EXCLUSIVE MEMORIES. <br />
            LET'S GIVE THAT RECOGNITION. CELEBRATE SPECIAL DAYS WITH A GRAND ARRANGEMENT.
          </h4>
          <a href="/services" className="cta-button">Explore Services</a>
        </div>
      </div>

      {/* ✅ Toggle Button (Bot Icon) */}
      {!showChat && (
        <img
          src={botIcon}
          alt="Chatbot Icon"
          onClick={() => setShowChat(true)}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '60px',
            height: '60px',
            cursor: 'pointer',
            borderRadius: '50%',
            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
            zIndex: 1000
          }}
        />
      )}

      {/* ✅ Chatbot Visible */}
      {showChat && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '350px',
          height: '500px',
          zIndex: 1000,
          boxShadow: '0 0 15px rgba(0,0,0,0.3)',
          borderRadius: '10px',
          overflow: 'hidden',
          backgroundColor: 'white'
        }}>
          <Chatbot />
          <button
            onClick={() => setShowChat(false)}
            style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              backgroundColor: '#ff5f5f',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '25px',
              height: '25px',
              cursor: 'pointer',
              fontWeight: 'bold',
              zIndex: 1100
            }}
          >×</button>
        </div>
      )}
    </div>
  );
}

export default Home;
