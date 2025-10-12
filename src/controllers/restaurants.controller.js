const Restaurant = require('../models/Restaurant');

// GET /api/restaurants
exports.list = async (req, res) => {
  try {
    // soporta búsqueda avanzada
    const { search, sort, fields, format, limit = 100, page = 1 } = req.query;

    let filter = {};
    if (search) {
      const orFilters = [
        { Restaurante: { $regex: search, $options: 'i' } },
        { Ubicacion: { $regex: search, $options: 'i' } },
        { Estilo: { $regex: search, $options: 'i' } },
        { Horario: { $regex: search, $options: 'i' } },
        { Precios: { $regex: search, $options: 'i' } }
      ];
      const searchNum = Number(search);
      if (!isNaN(searchNum) && search.trim() !== '') {
        orFilters.push({ Review: searchNum });
      }
      filter = { $or: orFilters };
    }

    const lim = Math.min(Number(limit) || 100, 200);
    const p = Math.max(Number(page) || 1, 1);
    const skip = (p - 1) * lim;

    // Oculta _id y __v por defecto
    let projection = '-Ubicacion -createdAt -updatedAt -__v';
    if (fields) projection = fields.split(',').map(s => s.trim()).join(' ');

    // Soporte de ordenamiento
    let sortOption = {};
    if (sort) {
      const order = sort.startsWith('-') ? -1 : 1;
      const field = sort.replace('-', '');
      sortOption[field] = order;
    }

    const results = await Restaurant.find(filter)
      .select(projection)
      .skip(skip)
      .limit(lim)
      .sort(sortOption)
      .lean();

    if (format === 'text') {
      const lines = results.map(d =>
        `${d.Restaurante} | ${d.Ubicacion ?? ''} | ${d.Estilo ?? ''} | ${d.Review ?? ''}`
      ).join('\n');
      return res.type('text/plain').send(`Lista de restaurantes\n${lines}\n`);
    }

    return res.json({ "Bienvenido esta es la lista de restaurantes en Nuevo Leon": results });

  } catch (err) {
    return res.status(500).json({ message: 'Internal error', error: err.message });
  }
};

// POST /api/restaurante
exports.create = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (payload.name && !payload.Restaurante) payload.Restaurante = payload.name;
    if (payload.Review != null) payload.Review = Number(payload.Review);

    const doc = await Restaurant.create(payload);
    // Elimina createdAt y updatedAt del resultado
    const result = doc.toObject();
    delete result.createdAt;
    delete result.updatedAt;
    // También elimina __v si quieres
    delete result.__v;
    return res.status(201).json({ message: 'Creado', result });
  } catch (err) {
    return res.status(400).json({ message: 'Invalid payload', error: err.message });
  }
};

// GET /api/restaurants/:id
exports.getById = async (req, res) => {
  try {
    const doc = await Restaurant.findById(req.params.id)
      .select('-_id -__v').lean();
    if (!doc) return res.status(404).json({ message: 'Not found' });
    return res.json({ message: 'Detalle', result: doc });
  } catch (err) {
    return res.status(400).json({ message: 'Invalid id', error: err.message });
  }
};

// PUT /api/restaurants/:id
exports.update = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (payload.name && !payload.Restaurante) payload.Restaurante = payload.name;
    if (payload.Review != null) payload.Review = Number(payload.Review);

    const doc = await Restaurant.findByIdAndUpdate(req.params.id, payload, { new: true })
      .select('-_id -__v').lean();
    if (!doc) return res.status(404).json({ message: 'Not found' });
    // Elimina createdAt y updatedAt del resultado
    delete doc.createdAt;
    delete doc.updatedAt;
    // También elimina __v si quieres
    delete doc.__v;
    return res.json({ message: 'Actualizado', result: doc });
  } catch (err) {
    return res.status(400).json({ message: 'Invalid id/payload', error: err.message });
  }
};

// DELETE /api/restaurants/:id
exports.remove = async (req, res) => {
  try {
    const r = await Restaurant.findByIdAndDelete(req.params.id);
    if (!r) return res.status(404).json({ message: 'Not found' });
    return res.status(204).end();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid id', error: err.message });
  }
};
