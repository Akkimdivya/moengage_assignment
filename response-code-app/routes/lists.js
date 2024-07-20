const express = require('express');
const List = require('../models/List');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/save', authMiddleware, async (req, res) => {
  const { name, responseCodes, imageLinks } = req.body;
  try {
    const list = new List({ name, responseCodes, imageLinks, userId: req.user._id });
    await list.save();
    res.status(201).send('List saved');
  } catch (error) {
    console.error('Error saving list:', error);
    res.status(400).send('Error saving list');
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const lists = await List.find({ userId: req.user._id });
    console.log('Fetched lists:', lists);
    res.send(lists);
  } catch (error) {
    console.error('Error fetching lists:', error);
    res.status(400).send('Error fetching lists');
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const listId = req.params.id;
    const list = await List.findOne({ _id: listId, userId: req.user._id });

    if (!list) {
      return res.status(404).send('List not found');
    }

    console.log('Fetched list:', list);
    res.send(list);
  } catch (error) {
    console.error('Error fetching list:', error);
    res.status(400).send('Error fetching list');
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await List.findByIdAndDelete(req.params.id);
    res.send('List deleted');
  } catch (error) {
    console.error('Error deleting list:', error);
    res.status(400).send('Error deleting list');
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { name, responseCodes, imageLinks } = req.body;
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res.status(404).send('List not found');
    }
    if (list.userId.toString() !== req.user._id.toString()) {
      return res.status(403).send('Not authorized to update this list');
    }
    list.name = name;
    list.responseCodes = responseCodes;
    list.imageLinks = imageLinks;
    await list.save();
    res.send('List updated');
  } catch (error) {
    console.error('Error updating list:', error);
    res.status(400).send('Error updating list');
  }
});

module.exports = router;
