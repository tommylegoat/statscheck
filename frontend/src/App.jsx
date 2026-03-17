import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import ChampionCard from './components/ChampionCard';
import PlayerCard from './components/PlayerCard';
import SearchBar from './components/SearchBar';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('champion');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      let endpoint = '';

      if (searchType === 'champion') {
        endpoint = `http://localhost:5000/api/champions/${searchQuery.trim()}`;
      } else if (searchType === 'player') {
        endpoint = `http://localhost:5000/api/players/${encodeURIComponent(searchQuery.trim())}/stats`;
      }

      const response = await axios.get(endpoint);
      setResults(response.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError(`No ${searchType} found for "${searchQuery}".`);
      } else {
        setError('Unable to reach the server. Make sure the backend is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = (type) => {
    setSearchType(type);
    setResults(null);
    setError(null);
  };

  return (
    <div className="App">
      <header className="header">
        <h1 className="header-title">⚔️ StatsCheck</h1>
        <p className="header-subtitle">League of Legends Tracker · EUW Region</p>
      </header>

      <main className="container">
        <SearchBar
          searchQuery={searchQuery}
          searchType={searchType}
          loading={loading}
          onQueryChange={setSearchQuery}
          onTypeChange={handleTypeChange}
          onSubmit={handleSearch}
        />

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {!error && !results && !loading && (
          <div className="hint">
            <span className="hint-icon">🔍</span>
            Search for a champion or player to see their stats.
          </div>
        )}

        {results && searchType === 'champion' && (
          <ChampionCard champion={results} />
        )}

        {results && searchType === 'player' && (
          <PlayerCard player={results} />
        )}
      </main>
    </div>
  );
}

export default App;