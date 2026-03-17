import React from 'react';
import './components.css';

function SearchBar({ searchQuery, searchType, loading, onQueryChange, onTypeChange, onSubmit }) {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <div className="search-bar">
        <div className="search-type-tabs">
          <button
            type="button"
            className={`tab-btn ${searchType === 'champion' ? 'tab-active' : ''}`}
            onClick={() => onTypeChange('champion')}
          >
            ⚔️ Champion
          </button>
          <button
            type="button"
            className={`tab-btn ${searchType === 'player' ? 'tab-active' : ''}`}
            onClick={() => onTypeChange('player')}
          >
            🎮 Player
          </button>
        </div>

        <div className="search-input-row">
          <input
            type="text"
            className="search-input"
            placeholder={
              searchType === 'champion'
                ? 'Enter champion name (e.g. Ahri)...'
                : 'Enter summoner name...'
            }
            value={searchQuery}
            onChange={(e) => onQueryChange(e.target.value)}
            autoComplete="off"
          />
          <button type="submit" className="search-btn" disabled={loading || !searchQuery.trim()}>
            {loading ? (
              <span className="spinner" />
            ) : (
              '🔍 Search'
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
