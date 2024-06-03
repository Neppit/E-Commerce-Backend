const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: Product
    });
    res.status(200).json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve tags' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: Product
    });
    if (!tag) {
      res.status(404).json({ error: 'Tag not found' });
    } else {
      res.status(200).json(tag);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve tag' });
  }
});

router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create tag' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Tag.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      res.status(200).json({ message: 'Tag updated successfully' });
    } else {
      res.status(404).json({ error: 'Tag not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update tag' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Tag.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(200).json({ message: 'Tag deleted successfully' });
    } else {
      res.status(404).json({ error: 'Tag not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete tag' });
  }
});

module.exports = router;
