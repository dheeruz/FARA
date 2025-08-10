import React from 'react';

function Items() {
  const items = [
    { name: 'Elegant Chairs & Tables', icon: '🪑' },
    { name: 'LED Walls & Projectors', icon: '📽️' },
    { name: 'Sound Systems', icon: '🔊' },
    { name: 'Stage Platforms', icon: '🎤' },
    { name: 'Flower Backdrops', icon: '🌸' },
    { name: 'Canopy & Tents', icon: '⛺' },
    { name: 'Lighting Equipment', icon: '💡' },
    { name: 'Photo Booths', icon: '📸' },
    { name: 'Red Carpet Runners', icon: '🟥' },
    { name: 'LED Dance Floors', icon: '🕺' },
  ];

  const styles = {
    container: {
      maxWidth: '1600px',
      margin: '0 auto',
      padding: '4rem 1rem',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    },
    heading: {
      fontSize: '2.5rem',
      textAlign: 'center',
      marginBottom: '3rem',
      color: '#38bdf8',
      textShadow: '1px 1px #000',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: '2rem',
    },
    card: {
      backgroundColor: '#1e293b',
      borderRadius: '16px',
      padding: '2rem',
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.4)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
      textAlign: 'center',
    },
    cardHover: {
      transform: 'translateY(-6px) scale(1.03)',
      boxShadow: '0 16px 32px rgba(0, 0, 0, 0.5)',
    },
    icon: {
      fontSize: '2.2rem',
      marginBottom: '1rem',
    },
    title: {
      fontSize: '1.25rem',
      marginBottom: '0.75rem',
      color: '#facc15',
    },
    description: {
      fontSize: '1rem',
      color: '#e2e8f0',
      lineHeight: '1.5',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎪 Available Items for Hire</h1>
      <div style={styles.grid}>
        {items.map((item, index) => (
          <div
            key={index}
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = styles.cardHover.transform;
              e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = styles.card.boxShadow;
            }}
          >
            <div style={styles.icon}>{item.icon}</div>
            <h2 style={styles.title}>{item.name}</h2>
            <p style={styles.description}>
              Premium quality {item.name.toLowerCase()} for elegant and professional events.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Items;