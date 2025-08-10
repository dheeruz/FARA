import React, { useState } from 'react';
import axios from 'axios';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const styles = {
    container: {
      maxWidth: '1500px',
      margin: '0 auto',
      padding: '3rem 1rem',
      backgroundColor: '#0f172a',
      color: '#f9fafb',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    },
    heading: {
      fontSize: '2.75rem',
      marginBottom: '2rem',
      textAlign: 'center',
      color: '#38bdf8',
      textShadow: '1px 1px #000',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      marginBottom: '2.5rem',
    },
    input: {
      padding: '14px 18px',
      borderRadius: '8px',
      border: '2px solid #3b82f6',
      backgroundColor: '#1e293b',
      color: '#f8fafc',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    },
    inputFocus: {
      borderColor: '#60a5fa',
      boxShadow: '0 0 0 3px rgba(96, 165, 250, 0.3)',
    },
    button: {
      padding: '14px 24px',
      backgroundColor: '#3b82f6',
      color: '#fff',
      fontSize: '1rem',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      width: 'fit-content',
      alignSelf: 'flex-start',
    },
    info: {
      backgroundColor: '#1f2937',
      padding: '20px',
      borderRadius: '10px',
      marginBottom: '24px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    },
    map: {
      width: '100%',
      height: '350px',
      border: '0',
      borderRadius: '12px',
    },
    social: {
      display: 'flex',
      gap: '16px',
      marginTop: '8px',
    },
    socialLink: {
      color: '#60a5fa',
      textDecoration: 'none',
    },
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/contact', form);
      alert('Message sent!');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Get in Touch</h1>

      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          style={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          style={styles.input}
          required
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows="4"
          style={{ ...styles.input, resize: 'vertical' }}
          required
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      <div style={styles.info}>
        <h2>📍 Address</h2>
        <p>#23, 1st Floor, Main Road, Chennai</p>

        <h2>☎️ Phone</h2>
        <p>+91 9100256717</p>

        <h2>✉️ Email</h2>
        <p>faraevents@gmail.com</p>

        <h2>🌐 Social Links</h2>
        <div style={styles.social}>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ ...styles.socialLink, color: '#f472b6' }}>Instagram</a>
          <a href="https://wa.me/919100256717" target="_blank" rel="noreferrer" style={{ ...styles.socialLink, color: '#34d399' }}>WhatsApp</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ ...styles.socialLink, color: '#60a5fa' }}>LinkedIn</a>
        </div>
      </div>

      <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.850147364361!2d80.233471!3d13.048965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267c0c68d2a71%3A0x46362683b04d3020!2sChennai!5e0!3m2!1sen!2sin!4v1655889600000!5m2!1sen!2sin"
        style={styles.map}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
}

export default Contact;