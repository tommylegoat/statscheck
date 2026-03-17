import React from 'react';
import PropTypes from 'prop-types';

const ChampionCard = ({ champion }) => {
    // Assuming champion object contains id and name
    const championImageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/${champion.id}.png`;

    return (
        <div className="champion-card">
            <img src={championImageUrl} alt={champion.name} />
            <h3>{champion.name}</h3>
        </div>
    );
};

ChampionCard.propTypes = {
    champion: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
};

export default ChampionCard;