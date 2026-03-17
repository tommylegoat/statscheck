import React from 'react';
import './components.css';

const RANK_COLORS = {
  Iron: '#6b4423',
  Bronze: '#a0522d',
  Silver: '#9e9e9e',
  Gold: '#ffd700',
  Platinum: '#00d4aa',
  Emerald: '#50c878',
  Diamond: '#5b9bd5',
  Master: '#9b59b6',
  Grandmaster: '#e74c3c',
  Challenger: '#00d4ff',
};

function getRankColor(rank) {
  if (!rank) return '#e0e0e0';
  const tier = rank.split(' ')[0];
  return RANK_COLORS[tier] || '#e0e0e0';
}

function PlayerCard({ player }) {
  const { summoner, rank } = player;
  const rankColor = getRankColor(rank);

  return (
    <div className="player-card card">
      <div className="card-header">
        <div className="player-avatar">{summoner.name.charAt(0).toUpperCase()}</div>
        <div className="player-info">
          <h2 className="player-name">{summoner.name}</h2>
          <span className="player-level">Level {summoner.level}</span>
        </div>
      </div>

      <div className="player-rank" style={{ borderColor: rankColor }}>
        <span className="rank-label">Rank</span>
        <span className="rank-value" style={{ color: rankColor }}>
          {rank || 'Unranked'}
        </span>
      </div>

      {player.matches && player.matches.length > 0 && (
        <div className="recent-matches">
          <h3 className="matches-title">Recent Matches</h3>
          <ul className="matches-list">
            {player.matches.map((match) => (
              <li key={match.id} className={`match-item ${match.result === 'WIN' ? 'match-win' : 'match-loss'}`}>
                <span className="match-champion">{match.champion}</span>
                <span className={`match-result ${match.result === 'WIN' ? 'win-badge' : 'loss-badge'}`}>
                  {match.result}
                </span>
                <span className="match-kda">{match.kda}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PlayerCard;
