const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

const blocks = [];

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/tracker', (req, res) => {
  res.render('tracker', { blocks });
});

app.post('/tracker', (req, res) => {
  const time = req.body.time;
  const activity = req.body.activity;
  const project = req.body.project;
  blocks.push({ time, activity, project });
  res.redirect('/tracker');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
