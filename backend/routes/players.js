const express = require('express');
const router = express.Router();

router.get('/:summonerName/stats', async (req, res) => {
  try {
    res.json({
      summoner: {
        name: req.params.summonerName,
        level: 150
      },
      rank: 'Gold II'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:summonerName/matches', async (req, res) => {
  try {
    res.json({
      matches: [
        { id: 1, champion: 'Ahri', result: 'WIN', kda: '12/2/8' },
        { id: 2, champion: 'Akali', result: 'LOSS', kda: '5/6/3' }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;