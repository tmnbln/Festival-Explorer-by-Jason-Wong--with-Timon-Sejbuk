import { useState, useEffect } from 'react';
import apiService from '../services/ApiServices';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [festivalSuggestions, setFestivalSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // debounce function to limit API calls
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, delay);
    };
  };

  const fetchSuggestions = async (query) => {
    if (query.trim() === '') {
      setFestivalSuggestions([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const suggestions = await apiService.getFestivalSuggestions(query);
      setFestivalSuggestions(suggestions);
    } catch (error) {
      console.error('Error fetching festival suggestions:', error);
      setError('Error fetching suggestions. Please try again.');
      setFestivalSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  useEffect(() => {
    debouncedFetchSuggestions(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.name);
    setFestivalSuggestions([]);
  };

  return (
    <div className="login-container">
      <div className="festify-title-container">
        <h1 className="festify-title">festify</h1>
      </div>
      <div className="login-text-container">
        <h2>Step 2</h2>
        <h3>Enter a festival name</h3>
        <div id="search-container">
          <input
            type="text"
            placeholder="Search festivals..."
            value={searchQuery}
            onChange={handleInputChange}
            disabled={loading}
            className="search-input"
          />
          {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
        </div>
        {festivalSuggestions.length > 0 && (
          <ul className="suggestions-list">
            {festivalSuggestions.map((suggestion) => (
              <li key={suggestion._id} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
