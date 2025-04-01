// App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import { motion } from 'framer-motion';

function App() {
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    // Mock data - in a real app, this would come from an API
    setEvents([
      {
        id: 1,
        title: "The Cryptic Chase",
        date: "8 APRIL 2025",
        time: "4 PM - 6 PM",
        location: "M206, M207, M208",
        imageUrl: "/cryptic_chase.png",
        registrationUrl: "https://forms.gle/3MEqSdn4tapWei5b6"
      },
      {
        id: 2,
        title: "Retro Code",
        date: "`10 APRIL 2025",
        time: "4 PM - 6 PM",
        location: "M308, M310, M312",
        imageUrl: "/retro_code.png",
        registrationUrl: "https://forms.gle/aCrc8yD5Kpgytpzn8"
      },
      {
        id: 3,
        title: "Code Gauntlet",
        date: "7 APRIL 2025",
        time: "4 PM - 6 PM",
        location: "M408, M409, M411",
        imageUrl: "/code_gaunlet.png",
registrationUrl: "https://forms.gle/UUmTrECzLTnCkn8L6"
      },
      {
        id: 4,
        title: "Brain Byte Battle",
        date: "9 APRIL 2025",
        time: "4 PM - 6 PM",
        location: "M307, M308, M309",
        imageUrl: "/brain_byte_battle.png",
registrationUrl: "https://forms.gle/dZPCnwwH8BYt5RH16"
      },
      {
        id: 5,
        title: "Vision Vanguard",
        date: "11 APRIL",
        time: "4 PM - 6 PM",
        location: "ONLINE MODE",
        imageUrl: "/vision_vanguard.png",
registrationUrl: "https://forms.gle/g15CG3W18ujpGH6Q8"
      }
    ]);
  }, []);

  return (
    <div className="app">
      <div className="background-effects">
{Array.from({ length: 50 }).map((_, index) => (
  <div 
    key={index} 
    className="code-symbol"
    aria-hidden="true"
    style={{
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 10 + 5,
color: '#ffffff',
      animationDelay: `${Math.random() * 15}s`,
textShadow: '0 0 15px #ffffff, 0 0 25px #00ffff' 

    }}
  >
    {['⎇', '⌥', '⇧', '⌘', '⏎', '⇥', '↩', '⌫', '⌦', '⌚','⌛', '⏳', '⏲', '⏱', '⍟', '☣', '☢', '⛁', '✱', '⚠','⛶', '⏻', '⏽'].sort(() => Math.random() - 0.5)[0]}
  </div>
))}

      </div>
      
      <header className="header">
        <div className="logo-container">
          <img src="/cesa-logo.png" alt="CESA Logo" className="logo" />
        </div>
        <motion.h1 
          className="title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          PLETHORA 2025
        </motion.h1>
        <motion.h2 
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
        </motion.h2>
      </header>
      
      <motion.section 
        className="events-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <h2 className="section-title">
          <span className="red-text">Our</span> <span className="green-text">Events</span>
        </h2>
        <p className="section-subtitle">Register And Unleash Your Talent – Join Our Tech Events & Shine!</p>
        
        <div className="events-container">
          {events.map((event, index) => (
            <motion.div 
              key={event.id}
              className="event-card"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 1 + (index * 0.2),
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 15px rgba(255, 0, 128, 0.7), 0 0 30px rgba(0, 255, 255, 0.4)"
              }}
            >
              <div className="event-image-container">
                <img src={event.imageUrl} alt={event.title} className="event-image" />
              </div>
              <h3 className="event-title">{event.title}</h3>
              <motion.button 
                className="register-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
<a 
                  href={event.registrationUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="register-button"
                >
                Register
</a>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

export default App;