require('dotenv').config();
const express = require('express');
const cors = require('cors');
const championRoutes = require('./routes/champions');
const playerRoutes = require('./routes/players');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/champions', championRoutes);
app.use('/api/players', playerRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'StatsCheck backend is running!' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 StatsCheck backend running on http://localhost:${PORT}`);
});