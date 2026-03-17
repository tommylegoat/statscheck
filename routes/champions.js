const express = require('express');
const router = express.Router();
const axios = require('axios');

// Fetch champion data from Riot API DDragon
router.get('/champions', async (req, res) => {
    try {
        // Fetch data from the Riot Games API
        const response = await axios.get('https://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion.json');
        const champions = response.data.data;
        const championList = Object.values(champions).map(champion => ({
            id: champion.key,
            name: champion.name,
            img: `http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${champion.image.full}`
        }));

        res.json(championList);
    } catch (error) {
        console.error('Error fetching champions:', error);
        res.status(500).json({ error: 'Failed to fetch champion data' });
    }
});

module.exports = router;