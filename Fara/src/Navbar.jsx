import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

function Navbar({ userRole, setIsAuthenticated, setUserRole }) {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(stored);
  }, []);

  const saveSearch = (term) => {
    const updated = [term, ...recentSearches.filter((t) => t !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      saveSearch(query.trim());
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setShowDropdown(false);
    }
  };

  const handleSelectSearch = (term) => {
    saveSearch(term);
    navigate(`/search?q=${encodeURIComponent(term)}`);
    setQuery('');
    setShowDropdown(false);
  };

  const clearRecentSearches = () => {
    localStorage.removeItem('recentSearches');
    setRecentSearches([]);
  };

  // Logout function clears auth and resets state
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setUserRole(null);
  };

  // Dynamic nav items — Admin Dashboard only for admins
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Items', path: '/items' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
    ...(userRole === 'admin' ? [{ name: 'Admin Dashboard', path: '/admin/contacts' }] : []),
    { name: 'Recommend-Events', path: '/recommend' },
  ];

  const styles = {
    nav: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#1e1e2f',
      padding: '0.8rem 1.5rem',
      flexWrap: 'wrap',
    },
    siteTitle: {
      color: '#ffffff',
      fontSize: '1.8rem',
      fontWeight: 'bold',
      textDecoration: 'none',
    },
    ul: {
      display: 'flex',
      listStyle: 'none',
      gap: '1.2rem',
      alignItems: 'center',
      flexWrap: 'wrap',
      margin: 0,
      padding: 0,
    },
    li: { display: 'inline-block' },
    link: (path) => ({
      color: location.pathname === path ? '#00d9ff' : '#f0f0f0',
      textDecoration: 'none',
      fontSize: '1rem',
      fontWeight: location.pathname === path ? '600' : 'normal',
    }),
    searchForm: { position: 'relative' },
    searchInput: {
      padding: '6px 10px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '1rem',
      outline: 'none',
      width: '200px',
    },
    searchButton: {
      padding: '6px 12px',
      backgroundColor: '#00d9ff',
      color: '#000',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      marginLeft: '6px',
    },
    dropdown: {
      position: 'absolute',
      top: '110%',
      left: 0,
      background: '#fff',
      color: '#000',
      width: '100%',
      boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
      borderRadius: '6px',
      zIndex: 999,
    },
    dropdownItemWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px 12px',
      borderBottom: '1px solid #ccc',
      cursor: 'pointer',
    },
    dropdownItemText: { flexGrow: 1 },
    removeIcon: {
      color: 'red',
      marginLeft: '10px',
      cursor: 'pointer',
    },
    clearButton: {
      background: 'none',
      border: 'none',
      color: '#007bff',
      cursor: 'pointer',
      padding: '8px 12px',
      textAlign: 'left',
      width: '100%',
    },
    logoutButton: {
      background: 'none',
      border: 'none',
      color: '#00d9ff',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: 'bold',
      padding: 0,
    },
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.siteTitle}>Fara</Link>

      <ul style={styles.ul}>
        {navItems.map((item) => (
          <li key={item.name} style={styles.li}>
            <Link to={item.path} style={styles.link(item.path)}>
              {item.name}
            </Link>
          </li>
        ))}

        <li style={styles.li}>
          <form onSubmit={handleSearch} style={styles.searchForm}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              style={styles.searchInput}
            />
            <button type="submit" style={styles.searchButton}>Go</button>

            {showDropdown && recentSearches.length > 0 && (
              <div style={styles.dropdown}>
                {recentSearches.map((term, i) => (
                  <div key={i} style={styles.dropdownItemWrapper}>
                    <span
                      style={styles.dropdownItemText}
                      onClick={() => handleSelectSearch(term)}
                    >
                      {term}
                    </span>
                    <span
                      style={styles.removeIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        const updated = recentSearches.filter((t) => t !== term);
                        setRecentSearches(updated);
                        localStorage.setItem('recentSearches', JSON.stringify(updated));
                      }}
                    >
                      ❌
                    </span>
                  </div>
                ))}
                <button onClick={clearRecentSearches} style={styles.clearButton}>
                  Clear recent searches
                </button>
              </div>
            )}
          </form>
        </li>

        {/* Logout button */}
        <li style={styles.li}>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
