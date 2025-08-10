import React from 'react';

function About() {
  const styles = {
    container: {
      maxWidth: '1600px',
      margin: '0 auto',
      padding: '4rem 1rem',
      backgroundColor: '#0f172a',
      color: '#f8fafb',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    },
    heading: {
      fontSize: '3rem',
      marginBottom: '2rem',
      textAlign: 'center',
      color: '#38bdf8',
      textShadow: '1px 1px #000',
    },
    section: {
      marginBottom: '2rem',
      backgroundColor: '#1e293b',
      padding: '2rem',
      borderRadius: '16px',
      boxShadow: '0 12px 24px rgba(0,0,0,0.4)',
    },
    subheading: {
      fontSize: '1.75rem',
      marginBottom: '0.75rem',
      color: '#facc15',
    },
    paragraph: {
      fontSize: '1rem',
      lineHeight: '1.6',
      color: '#e2e8f0',
    },
    list: {
      paddingLeft: '1.5rem',
      listStyleType: 'disc',
      color: '#a5f3fc',
    },
    testimonial: {
      fontStyle: 'italic',
      marginBottom: '0.5rem',
      color: '#fcd34d',
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Fara Events</h1>

      <div style={styles.section}>
        <h2 style={styles.subheading}>🎯 Who We Are</h2>
        <p style={styles.paragraph}>
          Fara Events is a passionate event planning and decor company based in Chennai, India. Since 2020, we've helped over 500+ clients craft unforgettable moments—whether it’s an intimate wedding, grand corporate gala, or vibrant birthday bash.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subheading}>🌟 Our Vision</h2>
        <p style={styles.paragraph}>
          To turn every special day into a masterpiece. With elegance, innovation, and care at the core, we create memories that last a lifetime.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subheading}>💡 Why Choose Us?</h2>
        <ul style={styles.list}>
          <li>✅ 500+ successful events across South India</li>
          <li>✅ Personalized planning tailored to your needs</li>
          <li>✅ 24/7 support and seamless coordination</li>
          <li>✅ Award-winning decorators and creative team</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subheading}>📢 Client Testimonials</h2>
        <p style={styles.testimonial}>✨ "Fara Events made our wedding day stress-free and magical!" – <em>Rohit & Priya</em></p>
        <p style={styles.testimonial}>✨ "From planning to decoration, everything was flawless. Highly recommended!" – <em>Avinash K.</em></p>
        <p style={styles.testimonial}>✨ "Their team was friendly, quick to respond, and the decor was beyond our imagination." – <em>Sandhya V.</em></p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subheading}>🤝 Meet the Team</h2>
        <p style={styles.paragraph}>
          Our core team includes visionary event planners, meticulous logistics managers, expert decorators, and vibrant hosts—all dedicated to ensuring your event is flawless from start to finish.
        </p>
      </div>
    </div>
  );
}

export default About;
