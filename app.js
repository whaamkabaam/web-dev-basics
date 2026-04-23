require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const blockSchema = new mongoose.Schema({
  time: String,
  activity: String,
  project: String
});
const Block = mongoose.model('Block', blockSchema);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/tracker', async (req, res) => {
  const blocks = await Block.find();
  res.render('tracker', { blocks });
});

app.post('/tracker', async (req, res) => {
  const time = req.body.time;
  const activity = req.body.activity;
  const project = req.body.project;
  await Block.create({ time, activity, project });
  res.redirect('/tracker');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
