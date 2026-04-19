const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/tracker', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/tracker.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/about.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
