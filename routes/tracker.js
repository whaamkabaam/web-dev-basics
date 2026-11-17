const express = require('express');
const Block = require('../models/block');

const router = express.Router();

// the time input always sends 08:30 style times, anything else would sort wrong
function isValidTime(time) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(time);
}

router.get('/tracker', async (req, res) => {
  try {
    const blocks = await Block.find().sort({ time: 1 });
    res.render('tracker', { blocks });
  } catch (err) {
    console.log(err);
    res.status(500).send('Could not load the tracker. Try again later.');
  }
});

router.post('/tracker', async (req, res) => {
  try {
    const time = req.body.time;
    const activity = req.body.activity;
    const project = req.body.project;
    if (!isValidTime(time)) {
      return res.status(400).send('Please enter a time like 08:30');
    }
    await Block.create({ time, activity, project });
    res.redirect('/tracker');
  } catch (err) {
    console.log(err);
    res.status(500).send('Could not save the block. Try again later.');
  }
});

router.post('/tracker/reset', async (req, res) => {
  try {
    await Block.deleteMany({});
    res.redirect('/tracker');
  } catch (err) {
    console.log(err);
    res.status(500).send('Could not reset the day. Try again later.');
  }
});

router.get('/tracker/:id/edit', async (req, res) => {
  try {
    const block = await Block.findById(req.params.id);
    if (!block) {
      return res.status(404).send('Block not found');
    }
    res.render('edit-block', { block });
  } catch (err) {
    console.log(err);
    res.status(500).send('Could not load the block. Try again later.');
  }
});

router.post('/tracker/:id/edit', async (req, res) => {
  try {
    const time = req.body.time;
    const activity = req.body.activity;
    const project = req.body.project;
    if (!isValidTime(time)) {
      return res.status(400).send('Please enter a time like 08:30');
    }
    await Block.findByIdAndUpdate(req.params.id, { time, activity, project });
    res.redirect('/tracker');
  } catch (err) {
    console.log(err);
    res.status(500).send('Could not save the block. Try again later.');
  }
});

router.delete('/tracker/:id', async (req, res) => {
  try {
    await Block.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
