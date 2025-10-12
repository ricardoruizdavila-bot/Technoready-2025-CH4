//const router = require('express').Router();
const c = require('../controllers/restaurants.controller');
//add to sprint 3
const express = require('express');
const Restaurant = require('../models/Restaurant');
const router = express.Router();


// Usa el controlador que ya filtra los campos
router.get('/', c.list);

router.post('/', c.create);
//router.get('/:id', c.getById); //
router.put('/:id', c.update);
router.delete('/:id', c.remove);
/// search and order

router.get('/', async (req, res) => {
  try {
    const { search, sort } = req.query;
    console.log('Query params:', req.query); // Log para depuración

    // Mostrar algunos documentos para depuración
    const allDocs = await Restaurant.find({}).limit(5);
    console.log('Primeros documentos en la colección:', allDocs.map(doc => doc.toObject()));

    // Mostrar los campos del modelo para depuración
    const sample = allDocs[0];
    if (sample) {
      console.log('Campos del documento Restaurant:', Object.keys(sample.toObject()));
    } else {
      console.log('No hay documentos en la colección Restaurant.');
    }

    let filter = {};
    if (search) {
      const orFilters = [
        { Restaurante: { $regex: search, $options: 'i' } },
        { Ubicacion: { $regex: search, $options: 'i' } },
        { Estilo: { $regex: search, $options: 'i' } },
        { Horario: { $regex: search, $options: 'i' } },
        { Precios: { $regex: search, $options: 'i' } }
      ];
      // Si search es un número válido, también busca por Review
      const searchNum = Number(search);
      if (!isNaN(searchNum)) {
        orFilters.push({ Review: searchNum });
      }
      filter = { $or: orFilters };
    }
    console.log('Filtro de búsqueda:', JSON.stringify(filter)); // Log para depuración

    let sortOption = {};
    if (sort) {
      const order = sort.startsWith('-') ? -1 : 1;
      const field = sort.replace('-', '');
      sortOption[field] = order;
    }
    const restaurants = await Restaurant.find(filter).sort(sortOption);
    console.log('Restaurantes encontrados:', restaurants.length); // Log para depuración
    if (!restaurants || restaurants.length === 0) {
      return res.status(404).json({ message: `No se encontraron restaurantes que contengan la palabra o valor "${search}".` });
    }
    res.json(restaurants);
  } catch (error) {
    console.error('Error al buscar restaurantes:', error); // Log para depuración
    res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
});

module.exports = router;

// Examples of searchs advanced:
// Buscar por palabra en cualquier campo de texto:
//   http://localhost:3000/api/restaurants?search=pizza
// Buscar por estilo:
//   http://localhost:3000/api/restaurants?search=italiano
// Buscar por horario:
//   http://localhost:3000/api/restaurants?search=8:00
// Buscar por review exacto (número):
//   http://localhost:3000/api/restaurants?search=4.0
// Buscar por palabra y ordenar por review descendente:
//   http://localhost:3000/api/restaurants?search=pizza&sort=-Review
// Buscar por palabra y ordenar por precios ascendente:
//   http://localhost:3000/api/restaurants?search=&sort=Precios