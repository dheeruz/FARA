import React from 'react';
import { Link } from 'react-router-dom';

function Blog() {
  const blogs = [
    {
      id: 1,
      title: '5 Wedding Decor Trends of 2025',
      snippet: 'Discover the latest decor styles that are set to redefine wedding aesthetics this year.',
    },
    {
      id: 2,
      title: 'How to Plan a Budget-Friendly Birthday Bash',
      snippet: 'Throw an amazing party without breaking the bank – here’s how.',
    },
    {
      id: 3,
      title: 'Checklist for Your Big Day',
      snippet: 'A step-by-step guide to ensure nothing is forgotten on your special day.',
    },
    {
      id: 4,
      title: 'Top Venues in Tamil Nadu',
      snippet: 'Explore some of the best venues perfect for weddings, birthdays, and corporate events.',
    },
    {
      id: 5,
      title: 'Why You Need a Professional Event Planner',
      snippet: 'Learn how a planner can save time, reduce stress, and make your event shine.',
    },
    {
      id: 6,
      title: 'How to Match Event Themes with Decor',
      snippet: 'From rustic weddings to corporate galas, here’s how to create cohesive experiences.',
    },
    {
      id: 7,
      title: 'DIY Party Decor Ideas',
      snippet: 'Fun and easy do-it-yourself decorations that will wow your guests without hurting your wallet.',
    },
    {
      id: 8,
      title: 'Behind the Scenes: How We Plan an Event',
      snippet: 'Go behind the curtain to see how Fara Events crafts unforgettable moments from scratch.',
    },
  ];

  const styles = {
    container: {
      maxWidth: '1600px',
      margin: '0 auto',
      padding: '4rem 1rem',
      backgroundColor: '#0f172a',
      color: '#f9fafb',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    },
    heading: {
      fontSize: '2.75rem',
      marginBottom: '2.5rem',
      textAlign: 'center',
      color: '#38bdf8',
      textShadow: '1px 1px #000',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
    },
    card: {
      backgroundColor: '#1e293b',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
    },
    cardHover: {
      transform: 'translateY(-6px) scale(1.02)',
      boxShadow: '0 14px 28px rgba(0, 0, 0, 0.5)',
    },
    title: {
      fontSize: '1.5rem',
      marginBottom: '0.5rem',
      color: '#facc15',
    },
    snippet: {
      fontSize: '1rem',
      color: '#e2e8f0',
    },
    link: {
      color: '#60a5fa',
      textDecoration: 'none',
      marginTop: '1rem',
      display: 'inline-block',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📰 Our Insights & Blog</h1>
      <div style={styles.grid}>
        {blogs.map((blog) => (
          <div
            key={blog.id}
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
            <h2 style={styles.title}>{blog.title}</h2>
            <p style={styles.snippet}>{blog.snippet}</p>
            <Link to={`/blog/${blog.id}`} style={styles.link}>
              Read more →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
