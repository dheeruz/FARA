// pages/Search.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const query = useQuery();
  const searchTerm = query.get('q')?.toLowerCase() || '';
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sample blog data (can later come from backend)
  const blogs = [
    '5 Wedding Decor Trends of 2025',
    'How to Plan a Budget-Friendly Birthday Bash',
    'Checklist for Your Big Day',
    'Top Venues in Tamil Nadu',
    'Why You Need a Professional Event Planner',
    'How to Match Event Themes with Decor',
  ];

  // Filter blogs
  const filteredBlogs = blogs.filter((title) =>
    title.toLowerCase().includes(searchTerm)
  );

  useEffect(() => {
    // If no blogs matched, fetch recommendations
    if (filteredBlogs.length === 0 && searchTerm) {
      setLoading(true);
      axios
        .post('http://127.0.0.1:5000/recommend', { query: searchTerm })
        .then((res) => {
          setRecommendations(res.data.recommendations || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Recommendation fetch error:', err);
          setLoading(false);
        });
    }
  }, [searchTerm, filteredBlogs.length]);

  return (
    <div style={{ padding: '2rem', color: '#f9fafb', maxWidth: '900px', margin: 'auto' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        Search Results for: "{searchTerm}"
      </h2>

      {/* BLOG MATCHES */}
      {filteredBlogs.length > 0 ? (
        filteredBlogs.map((title, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#1f2937',
              padding: '16px',
              borderRadius: '10px',
              marginBottom: '16px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            <h3>{title}</h3>
            <p>Discover more about <strong>{title}</strong>.</p>
            <a
              href={`/blog/${index}`}
              style={{ color: '#60a5fa', textDecoration: 'underline' }}
            >
              Read more →
            </a>
          </div>
        ))
      ) : (
        <>
          <p>No matching blog posts found.</p>

          {/* RECOMMENDATION FALLBACK */}
          {loading ? (
            <p>Loading recommendations...</p>
          ) : recommendations.length > 0 ? (
            <>
              <h3 style={{ marginTop: '2rem' }}>Recommended Events:</h3>
              {recommendations.map((event, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: '#1f2937',
                    padding: '16px',
                    borderRadius: '10px',
                    marginBottom: '16px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <h4>{event.title}</h4>
                  <p>{event.description}</p>
                </div>
              ))}
            </>
          ) : (
            <p>No recommendations found.</p>
          )}
        </>
      )}
    </div>
  );
}

export default Search;
