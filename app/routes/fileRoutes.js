// routes/files.js

const express = require('express');
const router = express.Router();
const db = require('../config/database');


router.post('/upload', (req, res) => {
  const { filename, uploader_id } = req.body;
  const sql = 'INSERT INTO files (filename, uploader_id) VALUES (?, ?)';
  db.query(sql, [filename, uploader_id], (err, result) => {
    if (err) throw err;
    res.send('File uploaded successfully');
  });
});

module.exports = router;
