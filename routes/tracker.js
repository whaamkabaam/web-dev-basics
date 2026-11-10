const express = require('express');
const Block = require('../models/block');

const router = express.Router();

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
    await Block.create({ time, activity, project });
    res.redirect('/tracker');
  } catch (err) {
    console.log(err);
    res.status(500).send('Could not save the block. Try again later.');
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
