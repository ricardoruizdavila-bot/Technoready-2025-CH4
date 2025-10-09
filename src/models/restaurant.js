const { Schema, model } = require('mongoose');

const RestaurantSchema = new Schema({
  // Acepta ambos nombres. Usaremos 'Restaurante' como principal.
  Restaurante: { type: String, trim: true },
  name:       { type: String, trim: true }, // opcional (alias de entrada)
  Review: Number,
  Ubicacion: String,
  Estilo: String,
  Horario: String,
  Precios: String
}, {
  collection: 'Restaurantes',   // nombre exacto de tu colección en Compass
  timestamps: true,
  strict: false
});


// Si llega 'name' pero no 'Restaurante', copiarlo.
RestaurantSchema.pre('validate', function (next) {
  if (!this.Restaurante && this.name) this.Restaurante = this.name;
  if (!this.Restaurante) this.invalidate('Restaurante', 'Restaurante is required');
  next();
});

module.exports = model('Restaurant', RestaurantSchema);
