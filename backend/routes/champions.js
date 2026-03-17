const express = require('express');
const router = express.Router();

const champions = [
  { id: 'Ahri', name: 'Ahri', role: 'Mid', winRate: 52.3, pickRate: 8.5, banRate: 3.2 },
  { id: 'Akali', name: 'Akali', role: 'Mid', winRate: 48.1, pickRate: 5.2, banRate: 2.1 },
  { id: 'Garen', name: 'Garen', role: 'Top', winRate: 54.2, pickRate: 6.8, banRate: 1.9 }
];

router.get('/', (req, res) => {
  res.json(champions);
});

router.get('/:championId', (req, res) => {
  const champion = champions.find(c => c.id === req.params.championId);
  if (champion) {
    res.json(champion);
  } else {
    res.status(404).json({ error: 'Champion not found' });
  }
});

router.get('/role/:role', (req, res) => {
  const roleChampions = champions.filter(c => c.role === req.params.role);
  res.json(roleChampions);
});

module.exports = router;