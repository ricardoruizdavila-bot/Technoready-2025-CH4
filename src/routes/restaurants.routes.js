const router = require('express').Router();
const c = require('../controllers/restaurants.controller');
//add to sprint 3
const express = require('express');
const Restaurant = require('../models/Restaurant');
const router = express.Router();


router.get('/', c.list);
router.post('/', c.create);
router.get('/:id', c.getById);
router.put('/:id', c.update);
router.delete('/:id', c.remove);
/// search and order
router.get('/', async (req, res) => {
  const { search, sort } = req.query;
  let filter = {};
  if (search) {
    filter = { name: { $regex: search, $options: 'i' } }; // Búsqueda por nombre
  }
  let sortOption = {};
  if (sort) {
    // example: sort=name o sort=-rating
    const order = sort.startsWith('-') ? -1 : 1;
    const field = sort.replace('-', '');
    sortOption[field] = order;
  }
  const restaurants = await Restaurant.find(filter).sort(sortOption);
  res.json(restaurants);
});


module.exports = router;
