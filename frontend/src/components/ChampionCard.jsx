import React from 'react';
import './components.css';

function ChampionCard({ champion }) {
  const getWinRateClass = (winRate) => {
    if (winRate >= 53) return 'stat-value good';
    if (winRate >= 50) return 'stat-value average';
    return 'stat-value bad';
  };

  return (
    <div className="champion-card card">
      <div className="card-header">
        <div className="champion-icon">{champion.name.charAt(0)}</div>
        <div className="champion-info">
          <h2 className="champion-name">{champion.name}</h2>
          <span className="champion-role role-badge">{champion.role}</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-label">Win Rate</span>
          <span className={getWinRateClass(champion.winRate)}>
            {champion.winRate}%
          </span>
          <div className="stat-bar">
            <div
              className="stat-bar-fill win-rate-fill"
              style={{ width: `${Math.min(champion.winRate, 100)}%` }}
            />
          </div>
        </div>

        <div className="stat-item">
          <span className="stat-label">Pick Rate</span>
          <span className="stat-value">{champion.pickRate}%</span>
          <div className="stat-bar">
            {/* pick/ban rates are typically <20%, so multiply by 5 to fill the bar visually */}
            <div
              className="stat-bar-fill pick-rate-fill"
              style={{ width: `${Math.min(champion.pickRate * 5, 100)}%` }}
            />
          </div>
        </div>

        <div className="stat-item">
          <span className="stat-label">Ban Rate</span>
          <span className="stat-value">{champion.banRate}%</span>
          <div className="stat-bar">
            {/* pick/ban rates are typically <20%, so multiply by 5 to fill the bar visually */}
            <div
              className="stat-bar-fill ban-rate-fill"
              style={{ width: `${Math.min(champion.banRate * 5, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChampionCard;
