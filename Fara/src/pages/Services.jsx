import React from 'react';

function Services() {
  const services = [
    { name: 'Wedding Planning', icon: '💍' },
    { name: 'Corporate Events', icon: '🏢' },
    { name: 'Birthday & Anniversary Parties', icon: '🎉' },
    { name: 'Stage Decoration', icon: '🎭' },
    { name: 'Catering Services', icon: '🍽️' },
    { name: 'Photography & Videography', icon: '📸' },
    { name: 'Theme-Based Events', icon: '🎨' },
    { name: 'Destination Events', icon: '✈️' },
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
      fontSize: '3rem',
      textAlign: 'center',
      marginBottom: '3rem',
      color: '#a78bfa',
      textShadow: '2px 2px #000',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '2rem',
    },
    card: {
      backgroundColor: '#1e293b',
      borderRadius: '16px',
      padding: '2rem',
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.5)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
      textAlign: 'center',
    },
    cardHover: {
      transform: 'translateY(-6px) scale(1.03)',
      boxShadow: '0 16px 32px rgba(0, 0, 0, 0.6)',
    },
    icon: {
      fontSize: '2.5rem',
      marginBottom: '1rem',
    },
    cardTitle: {
      fontSize: '1.5rem',
      marginBottom: '0.75rem',
      color: '#f472b6',
    },
    cardText: {
      fontSize: '1rem',
      lineHeight: '1.6',
      color: '#cbd5e1',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>✨ Our Signature Services</h1>
      <div style={styles.grid}>
        {services.map((service, index) => (
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
            <div style={styles.icon}>{service.icon}</div>
            <h2 style={styles.cardTitle}>{service.name}</h2>
            <p style={styles.cardText}>
              We specialize in {service.name.toLowerCase()} to make your event truly unforgettable.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;