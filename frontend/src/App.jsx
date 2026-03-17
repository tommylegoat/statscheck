import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('champion');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      let endpoint = '';
      
      if (searchType === 'champion') {
        endpoint = `http://localhost:5000/api/champions/${searchQuery}`;
      } else if (searchType === 'player') {
        endpoint = `http://localhost:5000/api/players/${searchQuery}/stats`;
      }

      const response = await axios.get(endpoint);
      setResults(response.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching data!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>⚔️ StatsCheck</h1>
        <p>League of Legends Tracker - EUW Region</p>
      </header>

      <main className="container">
        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-group">
            <select 
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="search-type"
            >
              <option value="champion">Champion</option>
              <option value="player">Player</option>
            </select>
            
            <input
              type="text"
              placeholder={searchType === 'champion' ? 'Search champion...' : 'Search summoner name...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            
            <button type="submit" className="search-btn" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {results && (
          <div className="results">
            <h2>Results</h2>
            <pre>{JSON.stringify(results, null, 2)}</pre>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;