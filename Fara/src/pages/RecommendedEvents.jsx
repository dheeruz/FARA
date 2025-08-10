import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const RecommendedEvents = () => {
  const [inputValue, setInputValue] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('eventRecentSearches')) || [];
    setRecentSearches(stored);
  }, []);

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const updateLocalStorage = (updated) => {
    localStorage.setItem('eventRecentSearches', JSON.stringify(updated));
    setRecentSearches(updated);
  };

  const handleRecommend = async (query = inputValue) => {
    if (!query.trim()) return;

    setLoading(true);
    setSearched(false);
    setError('');

    const updated = [query, ...recentSearches.filter(q => q !== query)].slice(0, 5);
    updateLocalStorage(updated);

    try {
      const response = await axios.post('http://127.0.0.1:5000/recommend', { query });
      const data = response.data;

      if (Array.isArray(data)) {
        setRecommendations(data);
      } else {
        setRecommendations([]);
        setError("Invalid response from server.");
      }
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setError('Error fetching data. Please try again.');
      setRecommendations([]);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  const handleRemoveSearch = (term) => {
    const updated = recentSearches.filter((item) => item !== term);
    updateLocalStorage(updated);
  };

  const handleSelectSearch = (term) => {
    setInputValue(term);
    setShowDropdown(false);
    handleRecommend(term);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
      <h2>🎯 Event Recommender</h2>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        placeholder="Enter your interest..."
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          fontSize: '16px',
        }}
      />

      {/* Dropdown of recent searches */}
      {showDropdown && recentSearches.length > 0 && (
        <div
          ref={dropdownRef}
          style={{
            position: 'absolute',
            top: '100%',
            width: '100%',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '6px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            zIndex: 10,
          }}
        >
          {recentSearches.map((term, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 12px',
                cursor: 'pointer',
                borderBottom: idx !== recentSearches.length - 1 ? '1px solid #eee' : 'none',
              }}
            >
              <span
                onClick={() => handleSelectSearch(term)}
                style={{ flexGrow: 1 }}
              >
                {term}
              </span>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveSearch(term);
                }}
                style={{
                  color: 'red',
                  marginLeft: '10px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                ❌
              </span>
            </div>
          ))}
        </div>
      )}

      <br />
      <button onClick={() => handleRecommend()} style={{ padding: '10px 20px', marginTop: '10px' }}>
        Get Recommendations
      </button>

      {loading && <p>Loading recommendations...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {searched && !loading && !error && (
        <div style={{ marginTop: '20px' }}>
          <h3>Search Results for: "{inputValue}"</h3>
          {recommendations.length > 0 ? (
            <ul>
              {recommendations.map((event) => (
                <li key={event.id}>
                  <strong>{event.title}</strong>: {event.description}
                </li>
              ))}
            </ul>
          ) : (
            <p>No matching events found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RecommendedEvents;
