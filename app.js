require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const trackerRoutes = require('./routes/tracker');
const pageRoutes = require('./routes/pages');
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/', trackerRoutes);
app.use('/', pageRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
