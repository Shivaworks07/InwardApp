const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',   
  user: 'root',         
  password: 'root',         
  database: 'inwardentites' 
});


db.connect(err => {
  if (err) {
    console.log('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

app.get('/api/entities', (req, res) => {
  const query = 'SELECT id, entity_name FROM entities'; 
  db.query(query, (err, results) => {
    if (err) {
      console.log('Error fetching entities:', err);
      res.status(500).send('Error fetching entities');
      return;
    }
    res.json(results);
  });
});



// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
