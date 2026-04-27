const express = require('express');
const Block = require('../models/block');

const router = express.Router();

router.get('/tracker', async (req, res) => {
  const blocks = await Block.find();
  res.render('tracker', { blocks });
});

router.post('/tracker', async (req, res) => {
  const time = req.body.time;
  const activity = req.body.activity;
  const project = req.body.project;
  await Block.create({ time, activity, project });
  res.redirect('/tracker');
});

router.delete('/tracker/:id', async (req, res) => {
  await Block.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
