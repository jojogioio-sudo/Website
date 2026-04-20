const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS ratings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    jobNumber TEXT NOT NULL,
    rating INTEGER NOT NULL,
    comment TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

app.get('/api/ratings/:jobNumber', (req, res) => {
  const jobNumber = req.params.jobNumber;
  db.all(
    'SELECT * FROM ratings WHERE jobNumber = ? ORDER BY createdAt DESC',
    [jobNumber],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows || []);
    }
  );
});

app.post('/api/ratings', (req, res) => {
  const { jobNumber, rating, comment } = req.body;

  if (!jobNumber || !rating || !comment) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  if (rating < 1 || rating > 5) {
    res.status(400).json({ error: 'Rating must be between 1 and 5' });
    return;
  }

  db.run(
    'INSERT INTO ratings (jobNumber, rating, comment) VALUES (?, ?, ?)',
    [jobNumber, rating, comment],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        id: this.lastID,
        jobNumber,
        rating,
        comment,
        createdAt: new Date().toISOString()
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
